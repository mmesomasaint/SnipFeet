import React, { useState, useEffect } from 'react'
import { setCookie, getCookie } from 'cookies-next'
import { useContext } from 'react'

const WishListContext = React.createContext()

export default function useWishList() {
  const {list, count, addToList, removeFromList, inList} = useContext(WishListContext)

  return {
    count, 
    list, 
    addToList, 
    removeFromList, 
    inList
  }
}

export function WishListProvider({ children }) {
  const [list, setList] = useState(JSON.parse(getCookie('list') || '[]'))
  const [count, setCount] = useState()

  useEffect(() => {
    setCookie('list', list)
    setCount(list.length)
  }, [list])

  const addToList = (id) => {
    const prevList = JSON.parse(getCookie('list'))
    if (prevList.includes(id)) return

    setList([...prevList, id])
  }

  const removeFromList = (id) => {
    const prevList = JSON.parse(getCookie('list'))
    const idx = prevList.indexOf(id)
    if (idx === -1) return

    setList([...prevList.slice(0, idx), ...prevList.slice(idx + 1)])
  }

  const inList = (id) => {
    const prevList = JSON.parse(getCookie('list') || '[]')
    return prevList.includes(id)
  }


  return (
    <WishListContext.Provider
      value={{ list, count, addToList, removeFromList, inList }}
    >
      {children}
    </WishListContext.Provider>
  )
}
