const themeChange = () => {
  return (
    <select
      className="dropdown dropdown-hover font-bold p-3 capitalize text-lg rounded"
      data-choose-theme
    >
      <option value="">Default</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="luxury">Luxury</option>
      <option value="synthwave">synthwave</option>
      <option value="cyberpunk">cyberpunk</option>
      <option value="dracula">dracula</option>
      <option value="cmyk">cmyk</option>
      <option value="cupcake">cupcake</option>
      <option value="valentine">valentine</option>
      <option value="coffee">coffee</option>
    </select>
  );
};

export default themeChange;
