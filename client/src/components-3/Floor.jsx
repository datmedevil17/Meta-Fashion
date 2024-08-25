import React from 'react'
import { useTexture } from '@react-three/drei'

const Floor = () => {
    const map =useTexture("./textures/map_floor/wood_floor_diff_1k.png")
    const displacementMap=useTexture("./textures/map_floor/wood_floor_disp_1k.png")
    const normalMap=useTexture("./textures/map_floor/wood_floor_nor_gl_1k.png")
    const roughMap=useTexture("./textures/map_floor/wood_floor_rough_1k.png")


  return (
    <mesh rotation-x={Math.PI*-0.5} receiveShadow>
        <planeGeometry args={[300,200]}/>
        <meshStandardMaterial
        map={map} displacementMap={displacementMap} normalMap={normalMap} roughMap={roughMap}/>
    </mesh>
  )
}

export default Floor
