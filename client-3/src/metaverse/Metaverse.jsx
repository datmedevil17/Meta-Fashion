import React from 'react'
import {Canvas} from "@react-three/fiber"
import { OrbitControls } from '@react-three/drei'
import Floor from '../components/Floor'
import Light from '../components/Light'
import StoreFloor from '../components/StoreFloor'
import StoreWall1 from '../components/StoreWall1'
import StoreWall2 from '../components/StoreWall2'
import StoreWall3 from '../components/StoreWall3'
import StoreWall4 from '../components/StoreWall4'
import StoreWall5 from '../components/StoreWall5'
import { Character } from '../components/Character'
import { Cashier } from '../components/Cashier'
import { Shelf } from '../components/Shelf'
import { Shelf2 } from '../components/Shelf2'
import { Shelf3 } from '../components/Shelf3'
import { Shelf4 } from '../components/Shelf4'
import { Shelf5 } from '../components/Shelf5'
import { Shelf6 } from '../components/Shelf6'
import { Tv } from '../components/Tv'

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
