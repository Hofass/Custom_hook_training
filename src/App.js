import React, { useEffect, useState } from "react";
import useHttp from "./hooks/use-http";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

function App() {
	const [tasks, setTasks] = useState([]);

	const transformTask = tasksObj => {
		const loadedTasks = [];

		for (const taskKey in tasksObj) {
			loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
		}

		setTasks(loadedTasks);
	};

	const {isLoading,error,sendRequest:fetchTasks} = useHttp(
		{ url: "https://react-http-6b4a6.firebaseio.com/tasks.json" },
		transformTask
	);
  
	useEffect(() => {
		fetchTasks();
	}, []);

	const taskAddHandler = task => {
		setTasks(prevTasks => prevTasks.concat(task));
	};

	return (
		<React.Fragment>
			<NewTask onAddTask={taskAddHandler} />
			<Tasks
				items={tasks}
				loading={isLoading}
				error={error}
				onFetch={fetchTasks}
			/>
		</React.Fragment>
	);
}

export default App;
