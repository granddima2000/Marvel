const Spinner = () => {
    return (
        <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.0"
      width="200px"
      height="200px"
      viewBox="0 0 128 130"
      xmlSpace="preserve"
      style={{ margin: '0 auto', background: 'none', display: 'block' }}
    >
      <g>
        <path d="M64 9.75A54.25 54.25 0 0 0 9.75 64H0a64 64 0 0 1 128 0h-9.75A54.25 54.25 0 0 0 64 9.75z" fill="#000000" />
        <animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="800ms" repeatCount="indefinite"></animateTransform>
      </g>
    </svg>
        
    );
};

export default Spinner;