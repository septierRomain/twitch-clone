import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

import logo from '../../assets/IconeTwitch.svg'
import croix from '../../assets/Croix.svg'
import menuIco from '../../assets/MenuIco.svg'
import search from '../../assets/Search.svg'

function Header(){

  const [menu, showMenu] = useState(false)
  const [smallScreen, setSmallScreen] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  useEffect(()=>{
    const mediaQuery = window.matchMedia('(max-width: 900px)')
    mediaQuery.addListener(handleMediaQueryChange)
    handleMediaQueryChange(mediaQuery)

    return ()=>{
      mediaQuery.removeListener(handleMediaQueryChange)
    }
  })

  const toggleNavRes = ()=>{
    showMenu(!menu)
  }

  const handleMediaQueryChange = mediaQuery => {
    if(mediaQuery.matches) {
      setSmallScreen(true)
    } else {
      setSmallScreen(false)
    }
  }

  const hideMenu = ()=>{
    if(menu === true){
      showMenu(!menu)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleKeyPress = (e) => {
    setSearchInput(e.target.value)
  }

  return(
    <div>
      <nav className="headerTop">
        {(menu || !smallScreen) && (
          <ul className="listeMenu">

            <li onClick={hideMenu} className="liensNav">
              <Link className='lien' to='/'>
                <img src={logo} alt="logo-twitch" className="logo"/>
              </Link>
            </li>
            <li onClick={hideMenu} className="liensNav">
              <Link className='lien' to='/'>
                Top Games
              </Link>
            </li>
            <li onClick={hideMenu} className="liensNav">
              <Link className='lien' to='top-streams' >
                Top Streams
              </Link>
            </li>
            <li className="liensNav">

              <form className="formSubmit" onSubmit={handleSubmit} >
                <input required value={searchInput} onChange={(e)=> handleKeyPress(e)} type="text" className="inputRecherche"/>
                <Link className='liens' to={{
                  pathname: `/resultat/${searchInput}`
                }} >
                  <button type='submit'>
                    <img src={search} alt="icone loupe" className="logoLoupe"/>
                  </button>
                </Link>
              </form>

            </li>

          </ul>
        )}
      </nav>
      <div className="menuResBtn">
        <img onClick={toggleNavRes} src={menu ? croix : menuIco} alt="icone menu responsive" className='menuIco'/>
      </div>
    </div>
  )
}
export default Header