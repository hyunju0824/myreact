import './App.css';
import MyJson from './myJson.json';
// 유효성 검사 구성 요소

function App() {
  return (
    // App.css 파일에서 .App 클래스 스타일 사용
    <div className="App">
      <h1>React Homework</h1>
      {/* 매핑 */}
      {
      MyJson.map(myJson => {
        return (
          <div className="box" key={myJson.id}> 
            {/* 제목만 표시 */}
            <strong>{myJson.userId}</strong>
            <strong>{myJson.userId}</strong>
            {/* {myJson.title} */}
          </div>
        )
      })
      }
    </div>
  )
}

export default App;
