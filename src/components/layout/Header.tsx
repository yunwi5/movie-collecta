import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import MainSearchbar from "../UI/Search/MainSearchbar";
import UserInitial from "../UI/DesignElement/UserInitial";
import { GenreList, productionCompanyList } from "../../models/Movie";
import { removeInvalidSearchCharacters } from "../../utilities/string-util";

const Header: React.FC = () => {
	const authCtx = useContext(AuthContext);
	const isLoggedIn = authCtx.isLoggedIn;
	const username = authCtx.user ? authCtx.user.userName : "";

	const navigate = useNavigate();

	const searchHandler = (searchWord: string) => {
		const validSearchWord = removeInvalidSearchCharacters(searchWord);
		navigate(`/store-movies?search=${validSearchWord}`, { replace: false });
	};

	const genreListNoOthers = GenreList.slice(0, GenreList.length - 1);

	return (
		<header className="header">
			<h3>
				<NavLink
					to="/home"
					className={(navData) =>
						navData.isActive ? "heading heading-active" : "heading"}
				>
					<span>MyMovies</span>
				</NavLink>
			</h3>
			<ul className="nav-front">
				<li className="nav-front__categories nav-main-item">
					<NavLink
						className={(navData) =>
							navData.isActive ? "nav-item nav-active" : "nav-item"}
						to="/movie-store"
					>
						<i className="fa fa-shopping-bag" />
						<span>Movie Store</span>
					</NavLink>
					{/* 1st (level 1) Nested navigation for browsing movies */}
					<ul className="nested-nav">
						<li className="nested-nav__item">
							<Link to="/movie-store" className="nested-nav__link">
								<span>Browse Our Store</span> <i className="fa fa-angle-right" />
							</Link>
						</li>
						<li className="nested-nav__item genre-nav">
							<Link to="/movie-store" className="nested-nav__link">
								<span>Browse By Genre</span> <i className="fa fa-angle-right" />
							</Link>
							{/* 2nd Nested (level 2) Navigation For Browsing Movie Genres */}
							<ul className="nested-nested-nav">
								{genreListNoOthers.map((genre, idx) => (
									<li className="nested-nav__item" key={idx}>
										<Link
											className="nested-nav__link"
											to={`/movie-store/genre/${genre}`}
										>
											{genre}
										</Link>
									</li>
								))}
							</ul>
						</li>
						<li className="nested-nav__item company-nav">
							<Link to="/movie-store" className="nested-nav__link">
								<span>Browse By Compnay</span> <i className="fa fa-angle-right" />
							</Link>

							<ul className="nested-nested-nav-2">
								{productionCompanyList.map((company, idx) => (
									<li className="nested-nav__item" key={idx}>
										<Link
											className="nested-nav__link"
											to={`/movie-store/producer/${company}`}
										>
											{company}
										</Link>
									</li>
								))}
							</ul>
						</li>
					</ul>
				</li>
			</ul>

			<MainSearchbar onSearch={searchHandler} />

			<ul className="nav-main">
				<li className="nav-main-item">
					<NavLink
						className={(navData) =>
							navData.isActive ? "nav-item nav-active" : "nav-item"}
						to="about"
					>
						<i className="fa fa-quote-right" />
						About
					</NavLink>
				</li>
				{isLoggedIn && (
					<li className="nav-main-item">
						<NavLink
							className={(navData) =>
								navData.isActive ? "nav-item nav-active" : "nav-item"}
							to="/movies"
						>
							<i className="fa fa-th-list" />
							Movies List
						</NavLink>
					</li>
				)}
				{isLoggedIn && (
					<li className="nav-main-item">
						<NavLink
							className={(navData) =>
								navData.isActive ? "nav-item nav-active" : "nav-item"}
							to="add-movie"
						>
							<i className="fa fa-plus-square" />
							Add Movie
						</NavLink>
					</li>
				)}
				{!isLoggedIn && (
					<li className="nav-main-item">
						<NavLink
							className={(navData) =>
								navData.isActive ? "nav-item nav-active" : "nav-item"}
							to="auth/login"
						>
							<i className="fa fa-sign-in" />
							Log in
						</NavLink>
					</li>
				)}
				{!isLoggedIn && (
					<li className="nav-main-item">
						<NavLink
							className={(navData) =>
								navData.isActive ? "nav-item nav-active" : "nav-item"}
							to="auth/signup"
						>
							<i className="fa fa-user-plus" />
							Sign up
						</NavLink>
					</li>
				)}
				{isLoggedIn && (
					<li className="nav-main-item">
						<a className="nav-item" onClick={authCtx.logout}>
							<i className="fa fa-sign-out" />
							Log out
						</a>
					</li>
				)}
				{isLoggedIn &&
				username && (
					<li className="userIcon nav-main-item">
						<UserInitial userName={username} />
					</li>
				)}
			</ul>
		</header>
	);
};

export default Header;
