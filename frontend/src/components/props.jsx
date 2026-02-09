
const Maths = ({ add, mul }) => {
  return (
    <div>
      <button onClick={() => console.log(add(2, 4))}>Add</button>
      <button onDoubleClick={() => console.log(mul(5, 4))}>Multiply</button>
    </div>
  );
};

export default Maths;
