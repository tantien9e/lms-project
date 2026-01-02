import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { Line } from 'rc-progress';
import Footer from '../../components/student/Footer';

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration, navigate } = useContext(AppContext);
  const [progressArray, setProgressArray] = useState([
    {lecctureCompleted: 2, totalLectures: 4},
    {lecctureCompleted: 1, totalLectures: 5},
    {lecctureCompleted: 3, totalLectures: 6},
    {lecctureCompleted: 1, totalLectures: 9},
    {lecctureCompleted: 4, totalLectures: 4},
    {lecctureCompleted: 2, totalLectures: 7},
    {lecctureCompleted: 2, totalLectures: 4},
    {lecctureCompleted: 1, totalLectures: 5},
    {lecctureCompleted: 3, totalLectures: 6},
    {lecctureCompleted: 1, totalLectures: 9},
    {lecctureCompleted: 4, totalLectures: 4},
    {lecctureCompleted: 2, totalLectures: 7},
    {lecctureCompleted: 1, totalLectures: 3},
  ])
  return (
    <>
      <div className='md:px-36 px-4 sm:px-8 pt-10 pb-16'>
        <h1 className='text-3xl font-semibold text-gray-800 mb-2'>My Enrollments</h1>
        <p className='text-gray-500 mb-8'>Track your learning progress and continue your courses</p>
        
        <div className='bg-white rounded-lg shadow-sm border border-gray-200/50 overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50 border-b border-gray-200'>
                <tr>
                  <th className='px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Course</th>
                  <th className='px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider max-sm:hidden'>Duration</th>
                  <th className='px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider max-sm:hidden'>Progress</th>
                  <th className='px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Status</th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-100'>
                {enrolledCourses.map((course, index) => {
                  const progress = progressArray[index];
                  const progressPercent = progress ? (progress.lecctureCompleted / progress.totalLectures * 100) : 0;
                  const isCompleted = progress && progress.lecctureCompleted === progress.totalLectures;
                  
                  return (
                    <tr 
                      key={index} 
                      className='hover:bg-gray-50/50 transition-colors duration-150'
                    >
                      <td className='px-4 md:px-6 py-4'>
                        <div className='flex items-center space-x-4'>
                          <img 
                            src={course.courseThumbnail} 
                            alt='course thumbnail' 
                            className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg flex-shrink-0 shadow-sm' 
                          />
                          <div className='flex-1 min-w-0'>
                            <p className='text-sm md:text-base font-medium text-gray-900 mb-2 line-clamp-2'>
                              {course.courseTitle}
                            </p>
                            <div className='w-full max-w-xs'>
                              <Line 
                                strokeWidth={3} 
                                percent={progressPercent} 
                                strokeColor={isCompleted ? '#10b981' : '#3b82f6'}
                                trailColor='#e5e7eb'
                                className='rounded-full'
                              />
                              <p className='text-xs text-gray-500 mt-1'>
                                {progressPercent.toFixed(0)}% Complete
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-sm:hidden'>
                        {calculateCourseDuration(course)}
                      </td>
                      <td className='px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-sm:hidden'>
                        {progress && (
                          <span className='font-medium text-gray-900'>
                            {progress.lecctureCompleted} / {progress.totalLectures}
                          </span>
                        )}
                        <span className='text-gray-500 ml-1'>lectures</span>
                      </td>
                      <td className='px-4 md:px-6 py-4'>
                        <button 
                          className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                            isCompleted
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow'
                          }`}
                          onClick={() => navigate('/player/' + course._id)}
                        >
                          {isCompleted ? 'Completed' : 'Continue Learning'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default MyEnrollments;