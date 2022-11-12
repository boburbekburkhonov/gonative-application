import React, { useEffect, useState } from 'react';

const App = () => {

  const [data, setData] = useState([])
  const [course, setCourse] = useState([])

  useEffect(() => {
    fetch('http://localhost:9090/requests')
    .then(res => res.json())
    .then(data => setData(data))
  }, [])

  useEffect(() => {
    fetch('http://localhost:9090/courses')
    .then(res => res.json())
    .then(data => setCourse(data))
  }, [])

  const addCourse = e => {
    e.preventDefault()

    const { name, price, desc } = e.target;

    fetch('http://localhost:9090/newCourse', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        price: price.value,
        desc: desc.value
      })
    })
    .then(res => res)
    .then(data => {
      if(data.status == 200){
        window.location.reload()
      }
    })
  }

  return (
    <div>
      <div className="container d-flex flex-column justify-content-center align-items-center">

        <form className='pt-5' onSubmit={addCourse}>
          <input className='form-control' type="text" name='name' required placeholder='name' />
          <input className='form-control mt-3' type="number" name='price' placeholder='price' required />
          <input className='form-control mt-3' type="text" placeholder='desc' name='desc' required />

          <button className='btn btn-info mt-3'>Send</button>
        </form>

        <h3 className='text-warning'>Requests</h3>

        <ul>
          {
            data && data.map((item, i) => {
              return <li key={i}>
                <h3>{item.name}</h3>
                <p className='h3'>{item.courses}</p>
                <a href="#" >{item.phone}</a>
              </li>
            })
          }
        </ul>
          <h3 className='text-warning'>Courses</h3>
        <ul>
          {
            course && course.map((item, i) => {
              return <li key={i}>
                <h3>{item.name}</h3>
                <p className='h3'>{item.price}</p>
                <p>{item.desc}</p>
              </li>
            })
          }
        </ul>
      </div>
    </div>
  );
};

export default App;