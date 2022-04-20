function Pet({ name, animal, breed }) {
  return (
    <div>
      <h2>{name}</h2>
      <h3>{animal}</h3>
      <h3>{breed}</h3>
    </div>
  );
}

export default Pet;

//   return React.createElement("div", {}, [
//     React.createElement("h2", { key: 1 }, props.name),
//     React.createElement("h3", { key: 2 }, props.animal),
//     React.createElement("h3", { key: 3 }, props.breed),
//   ]);
// }
