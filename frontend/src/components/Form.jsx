// // // import React, { useState } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import background from '../assets/images/image2.webp';

// // // const Form = () => {
// // //     const navigate = useNavigate();
// // //     const [formData, setFormData] = useState({
// // //         whatsapp: '',
// // //         name: ''
// // //     });
// // //     const [errors, setErrors] = useState({
// // //         whatsapp: '',
// // //         name: ''
// // //     });

// // //     const handleChange = (e) => {
// // //         const { name, value } = e.target;
// // //         setFormData(prev => ({
// // //             ...prev,
// // //             [name]: value
// // //         }));
// // //         setErrors(prev => ({
// // //             ...prev,
// // //             [name]: ''
// // //         }));
// // //     };

// // //     const validateForm = () => {
// // //         let isValid = true;
// // //         const newErrors = {};

// // //         if (!formData.whatsapp) {
// // //             newErrors.whatsapp = 'WhatsApp number is required';
// // //             isValid = false;
// // //         } else if (!/^\d{10}$/.test(formData.whatsapp)) {
// // //             newErrors.whatsapp = 'Please enter a valid 10-digit number';
// // //             isValid = false;
// // //         }

// // //         if (!formData.name.trim()) {
// // //             newErrors.name = 'Name is required';
// // //             isValid = false;
// // //         }

// // //         setErrors(newErrors);
// // //         return isValid;
// // //     };

// // //     const handleSubmit = (e) => {
// // //         e.preventDefault();
// // //         if (validateForm()) {
// // //             navigate('/menu');
// // //         }
// // //     };

// // //     return (
// // //         <div className="min-h-screen flex items-center justify-center p-4" 
// // //              style={{
// // //                backgroundImage: `url(${background})`,
// // //                backgroundSize: 'cover',
// // //                backgroundPosition: 'left center'
// // //              }}>
// // //             <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden p-8">
// // //                 <h2 className="text-3xl font-bold text-center text-amber-800 mb-8">
// // //                     Welcome to Da Aura Cafe & Alehouse
// // //                 </h2>
// // //                 <form onSubmit={handleSubmit} className="space-y-6">
// // //                     <div>
// // //                         <label 
// // //                             htmlFor="whatsapp" 
// // //                             className="block text-sm font-medium text-gray-700 mb-1"
// // //                         >
// // //                             WhatsApp Number
// // //                         </label>
// // //                         <input
// // //                             type="tel"
// // //                             id="whatsapp"
// // //                             name="whatsapp"
// // //                             value={formData.whatsapp}
// // //                             onChange={handleChange}
// // //                             placeholder="Enter your 10-digit number"
// // //                             className={`w-full px-4 py-3 rounded-xl border ${errors.whatsapp ? 'border-red-500' : 'border-gray-300'} 
// // //                                 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
// // //                                 transition-all duration-300 placeholder-gray-400`}
// // //                         />
// // //                         {errors.whatsapp && (
// // //                             <p className="mt-1 text-sm text-red-600">{errors.whatsapp}</p>
// // //                         )}
// // //                     </div>

// // //                     <div>
// // //                         <label 
// // //                             htmlFor="name" 
// // //                             className="block text-sm font-medium text-gray-700 mb-1"
// // //                         >
// // //                             Name
// // //                         </label>
// // //                         <input
// // //                             type="text"
// // //                             id="name"
// // //                             name="name"
// // //                             value={formData.name}
// // //                             onChange={handleChange}
// // //                             placeholder="Enter your name"
// // //                             className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} 
// // //                                 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
// // //                                 transition-all duration-300 placeholder-gray-400`}
// // //                         />
// // //                         {errors.name && (
// // //                             <p className="mt-1 text-sm text-red-600">{errors.name}</p>
// // //                         )}
// // //                     </div>

// // //                     <button
// // //                         type="submit"
// // //                         className="w-full bg-primary text-white py-3 px-4 rounded-xl
// // //                             hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
// // //                             transition-all duration-300 font-medium text-sm"
// // //                     >
// // //                         Continue to Menu
// // //                     </button>
// // //                 </form>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default Form;
// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import background from '../assets/images/image2.webp';

// // const Form = () => {
// //   const navigate = useNavigate();
// //   const [formData, setFormData] = useState({
// //     whatsapp: '',
// //     name: ''
// //   });
// //   const [errors, setErrors] = useState({
// //     whatsapp: '',
// //     name: ''
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //     setErrors(prev => ({
// //       ...prev,
// //       [name]: ''
// //     }));
// //   };

// //   const validateForm = () => {
// //     let isValid = true;
// //     const newErrors = {};

// //     if (!formData.whatsapp) {
// //       newErrors.whatsapp = 'WhatsApp number is required';
// //       isValid = false;
// //     } else if (!/^\d{10}$/.test(formData.whatsapp)) {
// //       newErrors.whatsapp = 'Please enter a valid 10-digit number';
// //       isValid = false;
// //     }

// //     if (!formData.name.trim()) {
// //       newErrors.name = 'Name is required';
// //       isValid = false;
// //     }

// //     setErrors(newErrors);
// //     return isValid;
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (validateForm()) {
// //       navigate('/menu');
// //     }
// //   };

// //   return (
// //     <div
// //       className="min-h-screen flex items-center justify-center p-4"
// //       style={{
// //         backgroundImage: `url(${background})`,
// //         backgroundSize: 'cover',
// //         backgroundPosition: 'left center'
// //       }}
// //     >
// //       <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden p-8">
// //         <h2
// //           className="text-4xl text-center text-amber-800 mb-8"
// //           style={{ fontFamily: "'Cinzel Decorative', serif" }}
// //         >
// //           Welcome to <br /> Da Aura Cafe & Alehouse
// //         </h2>
// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           <div>
// //             <label
// //               htmlFor="whatsapp"
// //               className="block text-sm font-medium text-gray-700 mb-1"
// //             >
// //               WhatsApp Number
// //             </label>
// //             <input
// //               type="tel"
// //               id="whatsapp"
// //               name="whatsapp"
// //               value={formData.whatsapp}
// //               onChange={handleChange}
// //               placeholder="Enter your 10-digit number"
// //               className={`w-full px-4 py-3 rounded-xl border ${
// //                 errors.whatsapp ? 'border-red-500' : 'border-gray-300'
// //               } focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition-all duration-300 placeholder-gray-400`}
// //             />
// //             {errors.whatsapp && (
// //               <p className="mt-1 text-sm text-red-600">{errors.whatsapp}</p>
// //             )}
// //           </div>

// //           <div>
// //             <label
// //               htmlFor="name"
// //               className="block text-sm font-medium text-gray-700 mb-1"
// //             >
// //               Name
// //             </label>
// //             <input
// //               type="text"
// //               id="name"
// //               name="name"
// //               value={formData.name}
// //               onChange={handleChange}
// //               placeholder="Enter your name"
// //               className={`w-full px-4 py-3 rounded-xl border ${
// //                 errors.name ? 'border-red-500' : 'border-gray-300'
// //               } focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition-all duration-300 placeholder-gray-400`}
// //             />
// //             {errors.name && (
// //               <p className="mt-1 text-sm text-red-600">{errors.name}</p>
// //             )}
// //           </div>

// //           <button
// //             type="submit"
// //             className="w-full bg-amber-800 text-white py-3 px-4 rounded-xl hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-800 transition-all duration-300 font-semibold tracking-wide"
// //           >
// //             Continue to Menu
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Form;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import background from '../assets/images/image2.webp';

// const Form = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     whatsapp: '',
//     name: ''
//   });
//   const [errors, setErrors] = useState({
//     whatsapp: '',
//     name: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     setErrors(prev => ({
//       ...prev,
//       [name]: ''
//     }));
//   };

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = {};

//     if (!formData.whatsapp) {
//       newErrors.whatsapp = 'WhatsApp number is required';
//       isValid = false;
//     } else if (!/^\d{10}$/.test(formData.whatsapp)) {
//       newErrors.whatsapp = 'Please enter a valid 10-digit number';
//       isValid = false;
//     }

//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       navigate('/menu');
//     }
//   };

//   return (
//     <div
//       className="w-full h-full flex items-center justify-center p-4"
//       style={{
//         backgroundImage: `url(${background})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center center'
//       }}
//     >
//       <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden p-8">
//         <h2 className="text-3xl font-bold text-center text-amber-800 mb-8">
//           Welcome to Da Aura Cafe & Alehouse
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label
//               htmlFor="whatsapp"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               WhatsApp Number
//             </label>
//             <input
//               type="tel"
//               id="whatsapp"
//               name="whatsapp"
//               value={formData.whatsapp}
//               onChange={handleChange}
//               placeholder="Enter your 10-digit number"
//               className={`w-full px-4 py-3 rounded-xl border ${errors.whatsapp ? 'border-red-500' : 'border-gray-300'}
//                 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
//                 transition-all duration-300 placeholder-gray-400`}
//             />
//             {errors.whatsapp && (
//               <p className="mt-1 text-sm text-red-600">{errors.whatsapp}</p>
//             )}
//           </div>

//           <div>
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter your name"
//               className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'}
//                 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
//                 transition-all duration-300 placeholder-gray-400`}
//             />
//             {errors.name && (
//               <p className="mt-1 text-sm text-red-600">{errors.name}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-amber-700 text-white py-3 px-4 rounded-xl
//               hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-700
//               transition-all duration-300 font-medium text-sm"
//           >
//             Continue to Menu
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Form;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // ✅ Import axios
import background from '../assets/images/image2.webp';

const Form = () => {
<<<<<<< HEAD
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    whatsapp: '',
    name: ''
  });
=======
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        whatsapp: '',
        name: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // Optional loading state
>>>>>>> 23cbc52973c9310e1975671a016bb4f0f49b0506

  const [errors, setErrors] = useState({
    whatsapp: '',
    name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: ''
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.whatsapp) {
      newErrors.whatsapp = 'WhatsApp number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = 'Please enter a valid 10-digit number';
      isValid = false;
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

<<<<<<< HEAD
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate('/menu');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
<div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden p-8 -mt-20">
<h2 className="text-3xl font-bold text-center text-amber-800 mb-8">
          Welcome to Da Aura Cafe & Alehouse
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="whatsapp"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              WhatsApp Number
            </label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="Enter your 10-digit number"
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.whatsapp ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 placeholder-gray-400`}
            />
            {errors.whatsapp && (
              <p className="mt-1 text-sm text-red-600">{errors.whatsapp}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 placeholder-gray-400`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <button
  type="submit"
  className="w-full bg-amber-700 text-white py-3 px-4 rounded-xl hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600 transition-all duration-300 font-medium text-sm"
>
  Continue to Menu
</button>

        </form>
      </div>
    </div>
  );
=======
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:9000/api/user', formData); // 🔗 Backend API endpoint
            console.log('User saved:', response.data);
            navigate('/menu');
        } catch (error) {
            console.error('Error saving user:', error);
            alert('Something went wrong while saving your info!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" 
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'left center'
            }}>
            <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden p-8">
                <h2 className="text-3xl font-bold text-center text-amber-800 mb-8">
                    Welcome to Da Aura Cafe & Alehouse
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
                            WhatsApp Number
                        </label>
                        <input
                            type="tel"
                            id="whatsapp"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            placeholder="Enter your 10-digit number"
                            className={`w-full px-4 py-3 rounded-xl border ${errors.whatsapp ? 'border-red-500' : 'border-gray-300'} 
                                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                                transition-all duration-300 placeholder-gray-400`}
                        />
                        {errors.whatsapp && <p className="mt-1 text-sm text-red-600">{errors.whatsapp}</p>}
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} 
                                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                                transition-all duration-300 placeholder-gray-400`}
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 px-4 rounded-xl
                            hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                            transition-all duration-300 font-medium text-sm"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Continue to Menu'}
                    </button>
                </form>
            </div>
        </div>
    );
>>>>>>> 23cbc52973c9310e1975671a016bb4f0f49b0506
};

export default Form;
