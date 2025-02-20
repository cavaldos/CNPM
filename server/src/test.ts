import Courserepo from './api/repository/course';

Courserepo.getCourses()
  .then((courses) => {
    console.log(courses);
  })
  .catch((error) => {
    console.error(error);
  });
