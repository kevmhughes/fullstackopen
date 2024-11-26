const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ total }) => <b>total of exercises {total}</b>;

const Part = ({ part }) => (
    <p>
      {part.name} {part.exercises}
    </p>
  );

const Content = ({ parts }) => (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );

const Course = ({ courses, total, title }) => {
    return (
      <>
        <h1>{title}</h1>
        <div>
          {courses.map((course, i) => (
            <div key={course.id}>
              <Header course={course.name} />
              <Content parts={course.parts} />
              <Total total={total[i]} />
            </div>
          ))}
        </div>
      </>
    );
  };

  export default Course;