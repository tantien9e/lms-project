import React, { useEffect, useState } from 'react'
import { dummyStudentEnrolled } from '../../assets/assets'
import Loading from '../../components/student/Loading'

const StudentsEnrolled = () => {
  const [enrolledData, setEnrolledData] = useState(null)

  const fetchEnrolledStudents = async () => {
    setEnrolledData(dummyStudentEnrolled)
  }

  useEffect(() => {
    fetchEnrolledStudents()
  }, [])

  return enrolledData ? (
    <div className='min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='w-full'>
        <h2 className='pb-4 text-xl md:text-2xl font-bold text-gray-900'>Students Enrolled</h2>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50 border-b border-gray-200'>
                <tr>
                  <th className='px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Student Name</th>
                  <th className='px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Course Title</th>
                  <th className='px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider max-sm:hidden'>Date of Enrollment</th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-100'>
                {enrolledData.map((item, index) => (
                  <tr key={index} className='hover:bg-gray-50 transition-colors duration-150'>
                    <td className='px-4 md:px-6 py-4'>
                      <div className='flex items-center space-x-3'>
                        <img 
                          src={item.student.imageUrl} 
                          alt={item.student.name}
                          className='w-10 h-10 md:w-12 md:h-12 rounded-full object-cover flex-shrink-0 border-2 border-gray-200'
                        />
                        <div className='flex-1 min-w-0'>
                          <p className='text-sm md:text-base font-medium text-gray-900 truncate'>
                            {item.student.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className='px-4 md:px-6 py-4'>
                      <p className='text-sm md:text-base text-gray-700 font-medium truncate'>
                        {item.courseTitle}
                      </p>
                    </td>
                    <td className='px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-sm:hidden'>
                      {new Date(item.purchaseDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : <Loading />
}

export default StudentsEnrolled;