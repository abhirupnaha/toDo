import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from "../../hooks/use-http";

const NewTask = (props) => {
	const { isLoading, error, sendRequest} = useHttp();

	const addData = (taskData, data) => {
		const generatedId = data.name; // firebase-specific => "name" contains generated id
		const createdTask = { id: generatedId, text: taskData};
		props.onAddTask(createdTask);
	}

	const enterTaskHandler = async (taskText) => {
		sendRequest(
			{
				url: 'https://react-http-b90a6-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: {text: taskText}
			},
			addData.bind(null, taskText)
		);
	}

	return (
		<Section>
			<TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
			{error && <p>{error}</p>}
		</Section>
	);
};

export default NewTask;
