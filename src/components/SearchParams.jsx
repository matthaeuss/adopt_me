function SearchParams() {
  const location = "Seattle, WA";

  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          placeholder="location"
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SearchParams;
