import { BsHandbag } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TbBrandHexo } from 'react-icons/tb';
import { MdFavoriteBorder } from "react-icons/md";
import "../styles/Navbar.css";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import React, { useEffect, useState } from "react";
function Navbar() {

    const [lastScrollY, setLastScrollY] = useState(0);
    const [navclass, setnavclass] = useState('navbar-container');
    const isServer = typeof window === 'undefined'

    const controlNavbar = () => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > 70) {
                setnavclass('newnavclass')
            }

            else {

                setnavclass('navbar-container')
            }
            setLastScrollY(window.scrollY);
        }
    };
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);
        }
    }, [lastScrollY]);




    const products = useSelector(state => state.navbarReducer.value);

    const { t } = useTranslation();
    const favs = useSelector(state => state.navbarReducer.va);
    function numberOfProducts() {
        let number = 0;
        for (let i = 0; i < products.length; i++) {
            number += products[i].quantity;
        }
        return number;
    }
    function favo() {
        let f = 0;
        for (let i = 0; i < favs.length; i++) {
            f += favs[i].quantity;
        }
        return f;
    }
    const navigate = useNavigate();
    function firstpage() {
        navigate("/");
        window.scroll({ top: 0, behavior: 'smooth' });
    }

    function handleClickHandBag() {
        navigate("/shoppingCart");
        window.scroll({ top: 0, behavior: 'smooth' });
    }
    function gofav() {
        navigate("/favorites");
        window.scroll({ top: 0, behavior: 'smooth' });
    }
    return (
        <div id={navclass}>
            <div className="switch">
                <input
                    id="language-toggle"
                    className="check-toggle check-toggle-round-flat"
                    type="checkbox"
                    onChange={(event) => {
                        if (event.target.checked) {
                            i18n.changeLanguage("en");
                        } else {
                            i18n.changeLanguage("fa");
                        }
                    }}
                />
                <label htmlFor="language-toggle"></label>
                <span className="on">فارسی</span>
                <span className="off">ENG</span>
            </div>
            <div id="icon" onClick={firstpage}>{t("y")}</div>




            <div className='parent-left-icons'>




                <div className='parent-all-favs' onClick={gofav} >
               
                    <MdFavoriteBorder id="gofav"  />
   <div id="number-of-favs">{favo()}</div>

                    {t("favs")}
                </div>

                <div className='parent-all-favs left-favs ' onClick={handleClickHandBag}>


                 
                <img src="carty.png" id="hand-bag" >
                </img>


                    <div id="number-of-favs">{numberOfProducts()}</div>


                    {t("listsof")}
                </div>

            </div>




        </div>
    )
};

export default Navbar;
