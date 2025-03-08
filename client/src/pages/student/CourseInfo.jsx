import LearningLayout from "../../components/Layout/student/LearningLayout";
import { Button, Avatar } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const CourseInfoPage = () => {
  return (
    <LearningLayout>
      <div className="flex flex-col gap-4">
        {/* Header Section */}
        <div className="flex items-center mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7f/Rice_University_Shield.png" // Replace with actual Rice University logo URL
            alt="Rice University Logo"
            className="w-16 h-16 mr-4"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              English and Academic Preparation - Pre-Collegiate
            </h1>
            <p className="text-sm text-gray-600">
              Instructors: Alice Ilano + 1 more
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mb-6">
          <Button variant="contained" color="primary" className="normal-case">
            Go To Course
          </Button>
          <Button variant="outlined" color="primary" className="normal-case">
            Already enrolled
          </Button>
          <span className="text-sm text-gray-600">Financial aid available</span>
        </div>

        {/* Stats Section */}
        <div className="flex space-x-4 mb-6 text-sm text-gray-600">
          <span>157,339 already enrolled</span>
          <span className="text-blue-600">Included with Coursera PLUS</span>
          <a href="#" className="text-blue-600 underline">
            Learn more
          </a>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <p className="text-gray-600">4 modules</p>
            <p className="text-sm text-gray-500">
              Gain insight into a topic and learn the fundamentals
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <p className="text-gray-600">4.7 ★</p>
            <p className="text-sm text-gray-500">(487 reviews)</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <p className="text-gray-600">Beginner level</p>
            <p className="text-sm text-gray-500">
              No prior experience required
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <p className="text-gray-600">Flexible schedule</p>
            <p className="text-sm text-gray-500">Learn at your own pace</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200">
          <Button variant="text" color="primary" className="normal-case">
            About
          </Button>
          <Button variant="text" color="primary" className="normal-case">
            Modules
          </Button>
          <Button variant="text" color="primary" className="normal-case">
            Recommendations
          </Button>
          <Button variant="text" color="primary" className="normal-case">
            Testimonials
          </Button>
          <Button variant="text" color="primary" className="normal-case">
            Reviews
          </Button>
        </div>

        {/* What You'll Learn Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">What you'll learn</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              academic English language skills to communicate effectively in
              spoken and written contexts
            </li>
            <li>
              strategies to read academic materials and take notes more
              efficiently
            </li>
            <li>
              guidelines for common assignments in undergraduate courses such as
              academic presentations and essay writing
            </li>
          </ul>
        </div>

        {/* Details to Know Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Details to know</h2>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <LinkedInIcon style={{ color: "#0156d1", marginRight: 4 }} />
              <span className="text-blue-600">Shareable certificate</span>
              <span className="text-gray-600 ml-1">
                Add to your LinkedIn profile
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600">Assessments</span>
              <span className="text-gray-600 ml-1">21 assignments</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600">Taught in English</span>
              <span className="text-gray-600 ml-1">24 languages available</span>
            </div>
          </div>
        </div>

        {/* Companies Section */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow border border-gray-200">
          <p className="text-gray-700 mb-2">
            See how employees at top companies are mastering in-demand skills
          </p>
          <a href="#" className="text-blue-600 underline">
            Learn more about Coursera for Business
          </a>
          <div className="flex space-x-4 mt-2">
            <img
              src="https://via.placeholder.com/50x30?text=Petrobras"
              alt="Petrobras"
              className="h-6"
            />
            <img
              src="https://via.placeholder.com/50x30?text=TATA"
              alt="TATA"
              className="h-6"
            />
            <img
              src="https://via.placeholder.com/50x30?text=Danone"
              alt="Danone"
              className="h-6"
            />
            <img
              src="https://via.placeholder.com/50x30?text=Capgemini"
              alt="Capgemini"
              className="h-6"
            />
            <img
              src="https://via.placeholder.com/50x30?text=P&G"
              alt="P&G"
              className="h-6"
            />
            <img
              src="https://via.placeholder.com/50x30?text=L'Oréal"
              alt="L'Oréal"
              className="h-6"
            />
          </div>
        </div>

        {/* Earn a Certificate Section */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow border border-gray-200">
          <h2 className="text-lg font-semibold mb-2">
            Earn a career certificate
          </h2>
          <p className="text-gray-600 mb-2">
            Add this credential to your LinkedIn profile, resume, or CV
          </p>
          <p className="text-gray-600">
            Share it on social media and in your performance review
          </p>
        </div>

        {/* Course Modules and Instructors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">
              There are 4 modules in this course
            </h3>
            <p className="text-gray-600 mb-2">
              The English and Academic Preparation - Pre-Collegiate non-credit
              course is for students with a (minimum) high-intermediate level of
              English. This certificate course is designed to help domestic and
              international students develop the academic skills necessary for
              success in undergraduate studies at an American university while
              strengthening their English proficiency.
            </p>
            <a href="#" className="text-blue-600 underline">
              Read more
            </a>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <span className="text-gray-600">
                  Listening, Speaking and Critical Thinking
                </span>
                <span className="text-gray-500 ml-2">
                  Module 1 - 6 hours to complete
                </span>
                <ExpandMoreIcon style={{ color: "#0156d1", marginLeft: 4 }} />
              </li>
              <li className="flex items-center">
                <span className="text-gray-600">Writer's Workshop</span>
                <span className="text-gray-500 ml-2">
                  Module 2 - 6 hours to complete
                </span>
                <ExpandMoreIcon style={{ color: "#0156d1", marginLeft: 4 }} />
              </li>
              <li className="flex items-center">
                <span className="text-gray-600">Reading and Note Taking</span>
                <span className="text-gray-500 ml-2">
                  Module 3 - 8 hours to complete
                </span>
                <ExpandMoreIcon style={{ color: "#0156d1", marginLeft: 4 }} />
              </li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Instructors</h3>
            <div className="flex items-center mb-2">
              <Avatar alt="Alice Ilano" src="https://via.placeholder.com/40" />
              <div className="ml-2">
                <p className="text-gray-600">Alice Ilano</p>
                <p className="text-sm text-gray-500">Rice University</p>
                <p className="text-sm text-gray-500">
                  5 Courses • 167,272 learners
                </p>
              </div>
            </div>
            <a href="#" className="text-blue-600 underline">
              View all 2 instructors
            </a>
            <div className="mt-4">
              <p className="text-gray-600">Offered by</p>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/7f/Rice_University_Shield.png"
                alt="Rice University"
                className="w-16 h-16 mt-2"
              />
            </div>
          </div>
        </div>
      </div>
    </LearningLayout>
  );
};
export default CourseInfoPage;
