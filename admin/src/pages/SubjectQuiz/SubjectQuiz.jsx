import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Navbar/Navbar'
import Quiz from '../../pages/SubjectQuiz/Quiz'
import './list.scss'


const SubjectQuiz = () => {
  return (
    <div className='list' style={{display:'flex'}}>
    <Sidebar />
    <div className="listContainer" style={{flex:'6'}}>
      <Navbar/>
     <Quiz/>
        </div>
      </div>
  )
}

export default SubjectQuiz