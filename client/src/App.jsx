import { useEffect, useState } from "react"

export default function App() {

  const [formData, setFormData] = useState({
    uname: "",
    email: "",
    address: ""
  });
  const [file, setFile] = useState(null);
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const res = await fetch('/api/listing/get');
      const data = await res.json();

      if (res.ok) {
        setGetData(data);
      }
    }
    fetchListings();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = new FormData();
      dataToSend.append("uname", formData.uname);
      dataToSend.append("email",formData.email);
      dataToSend.append("address",formData.address);
      dataToSend.append("file",file);

      const res = await fetch('/api/listing/upload', {
        method: 'POST',
        body: dataToSend
      })

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      }
      
      // Fetch data after submission
      const resFetch = await fetch('/api/listing/get');
      const dataFetch = await resFetch.json();

      if (resFetch.ok) {
        setGetData(dataFetch);
      }

      setFormData({
        uname: "",
        email: "",
        address: ""
      });
      setFile(null);

    } catch (error) {
      console.log(error.message);
    }
  }

  const showFile = (file) => {
    window.open(`http://localhost:3000/uploads/${file}`, "_blank", "noreferrer")
  }

  const handleDelete = async (listId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listId}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      }
      if (res.ok) {
        setGetData(prev => prev.filter(list => list._id !== listId));
      }

    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <div className='flex flex-col justify-center items-center h-screen p-4 sm:p-6 mb-12'>
      <div className="self-center mt-5 border shadow-md p-5 w-full max-w-sm sm:max-w-md md:max-w-lg">
        <h1 className='text-3xl font-semibold font-serif'>Create Listings</h1>
        <div className="mt-3">
          <form className='flex flex-col gap-4' autoComplete='off' onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter name' id='uname' className='border p-3 rounded-md' onChange={handleChange} value={formData.uname} />
            <input type="email" placeholder='Enter email' id='email' className='border p-3 rounded-md' onChange={handleChange} value={formData.email} />
            <input type="address" placeholder='Enter address' id='address' className='border p-3 rounded-md' onChange={handleChange} value={formData.address} />
            <input type="file" className='border p-3 rounded-md' onChange={(e) => setFile(e.target.files[0])}/>
            <button className='bg-blue-500 p-2 rounded-md mt-3 text-white hover:bg-blue-700 transition-colors duration-300' type="submit">Submit</button>
          </form>
        </div>
      </div>

      <h2 className='text-2xl font-semibold font-serif mt-10'>All Listings</h2>
        <table className='table-auto w-full max-w-sm sm:max-w-lg md:max-w-2xl border mt-3'>
          <thead className="bg-gray-200">
            <tr>
              <th className='px-4 py-2 border-b-2 border-gray-300'>Name</th>
              <th className='px-4 py-2 border-b-2 border-gray-300'>Email</th>
              <th className='px-4 py-2 border-b-2 border-gray-300'>Address</th>
              <th className='px-4 py-2 border-b-2 border-gray-300 truncate'>File</th>
              <th className='px-4 py-2 border-b-2 border-gray-300'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {getData.map((list, index) => (
              <tr key={list._id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                <td className='border px-4 py-2'>{list.uname}</td>
                <td className='border px-4 py-2'>{list.email}</td>
                <td className='border px-4 py-2'>{list.address}</td>
                <td className='border px-4 py-2'>
                  <div className='overflow-hidden overflow-ellipsis whitespace-nowrap cursor-pointer hover:underline text-blue-500' style={{ maxWidth: '200px' }} onClick={() => showFile(list.file)}>
                    {list.file}
                  </div>

                  {/* This is to show image */}
                  {/* <img src={`http://localhost:3000/uploads/${list.file}`} alt="" className="max-w-full h-auto" /> */}
                </td>
                <td className='border px-4 py-2 text-red-500 cursor-pointer hover:text-red-700' onClick={() => handleDelete(list._id)}>Delete</td>
              </tr>
            ))}
          </tbody>
        </table>

    </div>
  )
}
