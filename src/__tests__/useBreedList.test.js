/**
 * @jest-environment jsdom
 */

import { expect, test } from "@jest/globals";
import { render } from "@testing-library/react";
import useBreedList from "../hooks/useBreedList";
import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

// Prepared function with component to isolate useBreedList hook inside component
function getBreedList(animal) {
  let list;

  function TestComponent() {
    list = useBreedList(animal);
    return null;
  }

  render(<TestComponent />);
  return list;
}

test("gives an empty list with no animals", async () => {
  const [breedList, status] = getBreedList();

  expect(breedList).toHaveLength(0);
  expect(status).toBe("unloaded");
});

// ----------- New solution using renderHook

test("gives an empty list with no animals - new solution", async () => {
  const { result } = renderHook(() => useBreedList());

  const [breedList, status] = result.current;
  expect(breedList).toHaveLength(0);
  expect(status).toBe("unloaded");
});

test("", async () => {
  fetch.mockResponseOnce(
    JSON.stringify({
      animal: "dog",
    })
  );

  const result = await act(() => renderHook(() => useBreedList("cat")).result);

  const [breedList, status] = result.current;
  expect(status).toBe("loaded");
  expect(breedList).toEqual([]);
});

test("error gives empty list of animals", async () => {
  fetch.mockReject(new Error("Something is no yes"));

  const result = await act(() => renderHook(() => useBreedList("dog")).result);

  const [breedList, status] = result.current;
  expect(status).toBe("unloaded");
  expect(breedList).toEqual([]);
});

// gives back breeds with an animal

test("gives back breeds with an animal", async () => {
  const breeds = [
    "Havanese",
    "Bichon Frise",
    "Poodle",
    "Maltese",
    "Golden Retriever",
    "Labrador",
    "Husky",
  ];

  fetch.mockResponseOnce(
    JSON.stringify({
      animal: "dog",
      breeds,
    })
  );

  //Ugly, but working
  // let result_ = await act(() => {
  //     const {result} = renderHook(() => useBreedList('dog'));
  //     result_ = result;
  // })
  // const [breedList, status] = result_.current;

  // Codewars example
  await act(() => renderHook(() => useBreedList("dog")).result);
  const result = await act(() => renderHook(() => useBreedList("dog")).result);

  const [breedList, status] = result.current;

  expect(status).toBe("loaded");
  expect(breedList).toEqual(breeds);
});
