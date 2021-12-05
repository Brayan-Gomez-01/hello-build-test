import {useEffect, useState} from "react"
import { Link } from "react-router-dom";
import { Card, Col,  Layout, Input, Alert } from 'antd';
import { get } from '../libs/AsyncHttpRequest';
import Header from "./Header";
import Navbar from "./Navbar";
import { URL_API } from '../config/constants';
import Copyrigth from "./Copyrigth";


export const Dashboard = ()=>{

	const { Search } = Input;
	const { Content } = Layout;
	const repositoriesList  = [];
	const favoriteRepositoriesList = [];
	const [error, setError] = useState(false);
	const [search, setSearch] = useState("");
	const [searchList, setSearchList] = useState([]);
	const [repositories, setRepositories] = useState([]);
	const [favoriteRepositories, setFavoriteRepositories] = useState([]);
	const [gitHubUser, setGitHubUser] = useState(localStorage.getItem("github_user") || "");
	const limit = 100;
	const login = localStorage.getItem("login")
	const onSearch = (event) => {
		setGitHubUser(event.target.value)
	};
	const getRepositoryByName = (event)=>{
		const { value } = event.target
		setSearch(value)
	} 
	useEffect(()=>{
		if(login !== "true"){
			window.location.replace("/")
		}
	},[login])	
	useEffect(()=>{
			async function getRepositories() {
				if(gitHubUser){
				const {data}  = await get(`${URL_API}/repo/user/${gitHubUser}/limit/${limit}`);
				if(data.errors){
					setError(data.errors[0].message)
					setRepositories([])
				}else if(data.data){
					setRepositories(data.data.user.repositories.nodes);
					setSearchList([])
					setError(false)
				}
			}
			}
			getRepositories()
		},[gitHubUser])

	const likeRepository = (name)=>{
		let indexCard = name.target.getAttribute("index")
		repositories.map((items, index) => {
			if(items.databaseId == indexCard){
				favoriteRepositoriesList.push(
				<Card  title={items.name} bordered={false} className="mb-5 mt-1"  >
					<p>repository Url: <a href={items.url} target="_blank">{items.url}</a></p>
					{items.languages.nodes.length != 0 ? <p>Languages</p>:""}
					{items.languages.nodes.map((item,index)=>{
					return 	<Input placeholder="" defaultValue={item.name} className="w-25" disabled={true}/>
					})}
				</Card>)
				}
			})
			setFavoriteRepositories(favoriteRepositories.concat(favoriteRepositoriesList))
		}

		for(const [index, repository] of repositories.entries() ) {
			repositoriesList.push(
			<Card  title={repository.name} bordered={false} index={repository.databaseId}  className="mb-5 mt-1" extra={<button type="button" className="btn btn-primary" onClick={likeRepository}  index={repository.databaseId}>Check Favorite</button>}>
				<p>repository Url: <a href={repository.url} target="_blank">{repository.url}</a></p>
				{repository.languages.nodes.length != 0 ? <p>Languages</p>:""}
				{repository.languages.nodes.map((item,index)=>{
				return 	<Input placeholder="" defaultValue={item.name} className="w-25" disabled={true}/>
				})}
			</Card>)
		}

	
	useEffect(() => {
			if (search == "") {
			setSearchList(repositoriesList);
			} else {
				const list = []
				repositories.filter((items, index) => {
					if(items.name.includes(search)){
						list.push(
						<Card  title={items.name} bordered={false} className="mb-5 mt-1" extra={<button type="button" className="btn btn-primary" onClick={likeRepository}  index={items.databaseId}>Check Favorite</button>}>
							<p>repository Url: <a href={items.url} target="_blank">{items.url}</a></p>
							{items.languages.nodes.length != 0 ? <p>Languages</p>:""}
							{items.languages.nodes.map((item,index)=>{
							return 	<Input placeholder="" defaultValue={item.name} className="w-25" disabled={true}/>
							})}
						</Card>
						)
					}
				})
				setSearchList(list)
			}
		}, [search]);

	

	return (
	<Layout id="dashboard">
	<Header title="Hello Build Dashboard" />
	<Content className="mt-5">
	<Link to="/profile"><button type="button" className="btn btn-primary float-right mr-5">Profile</button></Link>
	<Navbar className="mt-5" />
	<div className="site-card-wrapper">
	<div>
	<label>
	<p className="ml-3">Github User:</p>
	<Search placeholder="Git Hub User Name" onChange={onSearch} style={{ width: 200 }} className="ml-3 mb-5"/>
	</label>
	</div>
	<h3 className="float-left">Your Repositories {gitHubUser != "" ? gitHubUser:""}</h3>
	{favoriteRepositories.length != 0 ? <h3 className="float-right mr-5">Your Favorite Repositories  </h3>: ""}
	<Content >
	<div>
		<Search placeholder="Search Repository Name" onChange={getRepositoryByName} style={{ width: 200 }} className="ml-3 mb-3 mt-2" />
	</div>
	<Col className="gutter-row p-3 float-left"
            xs={24}
            sm={24}
            md={24}
            lg={12}
            >
		{error !== false ? <Alert message={error} type="error" className="mb-2" />:""}
     	{searchList.length != 0 ? searchList : repositoriesList}

	</Col>
	{favoriteRepositories.length != 0 ? 
		

			<Col className="gutter-row p-3 float-right"
            xs={24}
            sm={24}
            md={24}
            lg={12}
            >
				{favoriteRepositories}
			</Col>

			: ""
			}
	</Content >
	
	</div>
	</Content>
	<Copyrigth/>
	</Layout>)
}