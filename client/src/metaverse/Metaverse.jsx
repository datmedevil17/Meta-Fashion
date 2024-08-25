import React from 'react'
import {Canvas} from "@react-three/fiber"
import { OrbitControls } from '@react-three/drei'
import Floor from '../components-3/Floor'
import Light from '../components-3/Light'
import StoreFloor from '../components-3/StoreFloor'
import StoreWall1 from '../components-3/StoreWall1'
import StoreWall2 from '../components-3/StoreWall2'
import StoreWall3 from '../components-3/StoreWall3'
import StoreWall4 from '../components-3/StoreWall4'
import StoreWall5 from '../components-3/StoreWall5'
import { Character } from '../components-3/Character'
import { Cashier } from '../components-3/Cashier'
import { Shelf } from '../components-3/Shelf'
import { Shelf2 } from '../components-3/Shelf2'
import { Shelf3 } from '../components-3/Shelf3'
import { Shelf4 } from '../components-3/Shelf4'
import { Shelf5 } from '../components-3/Shelf5'
import { Shelf6 } from '../components-3/Shelf6'
import { Tv } from '../components-3/Tv'
// import '../styles/Metaverse.css'

const Metaverse = () => {
  return (
    <div className='container'>
        <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
            <OrbitControls/>
            <Light/>
            <Floor/>
            <StoreFloor/>
            <StoreWall1/>
            <StoreWall2/>
            <StoreWall3/>
            <StoreWall4/>
            <StoreWall5/>
            <Character/>
            <Cashier/>
            <Shelf/>
            <Shelf2/>
            <Shelf3/>
            <Shelf4/>
            <Shelf5/>
            <Shelf6/>
            <Tv/>
           
            

        </Canvas>      
    </div>
  )
}

export default Metaverse
