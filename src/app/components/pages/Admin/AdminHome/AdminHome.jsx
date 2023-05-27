import { useState } from "react";
import BuildIcon from "@mui/icons-material/Build";
import "./AdminHome.sass";
import BurgerMenu from "../../../BurgerMenu/BurgerMenu";
import { Route, Routes } from "react-router-dom";
import AdminArticle from "../Articles/AdminArticle";
import AdminUser from "../AdminUser/AdminUser";
import DropDownButtonAdmin from "../../../DropdownButtonAdmin/DropdownButtonAdmin";
import CreateNewArticle from "../Articles/Forms/CreateNewArticle/CreateNewArticle";
import EditArticle from "../Articles/Forms/EditArticle/EditArticle";
import AdminPlaces from "../AdminPlaces/AdminPlaces";
import CreateNewPlace from "../AdminPlaces/Forms/CreateNewPlace/CreateNewPlace";
import EditPlace from "../AdminPlaces/Forms/EditPlace/EditPlace";
import AdminLifehacks from "../AdminLifehacks/AdminLifehacks";
import CreateLifehack from "../AdminLifehacks/Forms/CreateLifehack/CreateLifehack";
import EditLifehack from "../AdminLifehacks/Forms/EditLifehack/EditLifehack";
import AdminSupport from "../AdminSupport/AdminSupport";
import AdminBlog from "../AdminBlog/AdminBlog";

const items = [
	{ value: "Data base", to: "/admin", icon: <BuildIcon /> },
	{ value: "Articles", to: "article", icon: <BuildIcon /> },
	{ value: "Places", to: "places", icon: <BuildIcon /> },
	{ value: "Life hacks", to: "lifehacks", icon: <BuildIcon /> },
	{ value: "Support", to: "support", icon: <BuildIcon /> },
	{ value: "Blog", to: "blog", icon: <BuildIcon /> },
	{ value: "Basket", to: "/admin", icon: <BuildIcon /> },
];

function AdminHome() {
	const [menuActive, setMenuActive] = useState(false);

	return (
		<div className="AdminHome">
			<nav className="my-nav">
				<div
					className="my-burger-btn"
					onClick={() => setMenuActive(!menuActive)}
				>
					<span
						className={
							menuActive
								? "my-burger-btn__span-top active"
								: "my-burger-btn__span-top"
						}
					/>
					<span
						className={
							menuActive
								? "my-burger-btn__span-middle active"
								: "my-burger-btn__span-middle"
						}
					/>
					<span
						className={
							menuActive
								? "my-burger-btn__span-bottom active"
								: "my-burger-btn__span-bottom"
						}
					/>
				</div>
				<DropDownButtonAdmin />
			</nav>
			<main className="my-main">
				<Routes>
					<Route index element={<AdminUser />} />
					<Route path="article" element={<AdminArticle />} />
					<Route path="article/create" element={<CreateNewArticle />} />
					<Route path={`article/edit/:id`} element={<EditArticle />} />
					<Route path="lifehacks" element={<AdminLifehacks />} />
					<Route
						path="lifehacks/create-lifehack"
						element={<CreateLifehack />}
					/>
					<Route path={`lifehacks/edit/:id`} element={<EditLifehack />} />
					<Route path="places/" element={<AdminPlaces />} />
					<Route path="places/create" element={<CreateNewPlace />} />
					<Route path={`places/edit/:id`} element={<EditPlace />} />
					<Route path="support" element={<AdminSupport />} />
					<Route path="blog" element={<AdminBlog />} />
				</Routes>
			</main>

			<BurgerMenu
				menuActive={menuActive}
				setMenuActive={setMenuActive}
				header={"Admin Panel"}
				items={items}
			/>
		</div>
	);
}

export default AdminHome;
