import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';

const MyCourses = () => {
  const {currency, allCourses} = useContext(AppContext);
  const [courses, setCourses] = useState(null);
  
  const fetchEducatorCourses = async () => {
    setCourses(allCourses);
  }

  useEffect(() => {
    fetchEducatorCourses()
  }, []);


  return courses ? (
    <div className='min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='w-full'>
        <h2 className='pb-4 text-xl md:text-2xl font-bold text-gray-900'>My Courses</h2>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50 border-b border-gray-200'>
                <tr>
                  <th className='px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Course</th>
                  <th className='px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Earnings</th>
                  <th className='px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Students</th>
                  <th className='px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider max-sm:hidden'>Published On</th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-100'>
                {courses.map((course) => {
                  const earnings = Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice/100));
                  return (
                    <tr key={course._id} className='hover:bg-gray-50 transition-colors duration-150'>
                      <td className='px-4 md:px-6 py-4'>
                        <div className='flex items-center space-x-4'>
                          <img 
                            src={course.courseThumbnail} 
                            alt={course.courseTitle}
                            className='w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg flex-shrink-0 shadow-sm'
                          />
                          <div className='flex-1 min-w-0'>
                            <p className='text-sm md:text-base font-medium text-gray-900 truncate'>
                              {course.courseTitle}
                            </p>
                            <p className='text-xs text-gray-500 mt-1 hidden md:block'>
                              {course.courseDescription ? course.courseDescription.slice(0, 60) + '...' : 'No description'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className='px-4 md:px-6 py-4 whitespace-nowrap'>
                        <span className='text-sm md:text-base font-semibold text-gray-900'>
                          {currency}{earnings.toLocaleString()}
                        </span>
                      </td>
                      <td className='px-4 md:px-6 py-4 whitespace-nowrap'>
                        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs md:text-sm font-medium bg-blue-100 text-blue-800'>
                          {course.enrolledStudents.length} {course.enrolledStudents.length === 1 ? 'student' : 'students'}
                        </span>
                      </td>
                      <td className='px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-sm:hidden'>
                        {new Date(course.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : <Loading />
}

export default MyCourses;