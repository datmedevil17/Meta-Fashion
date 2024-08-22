import React from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from "three";



const StoreFloor = () => {
    const map =useTexture("./textures/store_floor/marble_mosaic_tiles_diff_1k.png")
    const displacementMap=useTexture("./textures/store_floor/marble_mosaic_tiles_disp_1k.png")
    const normalMap=useTexture("./textures/store_floor/marble_mosaic_tiles_nor_gl_1k.png")
    const roughMap=useTexture("./textures/store_floor/marble_mosaic_tiles_rough_1k.png")

    const textureRepeat = 2; 

    map.repeat.set(textureRepeat, textureRepeat);
    displacementMap.repeat.set(textureRepeat, textureRepeat);
    normalMap.repeat.set(textureRepeat, textureRepeat);
    roughMap.repeat.set(textureRepeat, textureRepeat);
  
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    displacementMap.wrapS = displacementMap.wrapT = THREE.RepeatWrapping;
    normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
    roughMap.wrapS = roughMap.wrapT = THREE.RepeatWrapping;


  return (
    <mesh rotation-x={Math.PI*-0.5} receiveShadow position={[0,0.001,0]}>
        <planeGeometry args={[250,150]}/>
        <meshStandardMaterial
        map={map} displacementMap={displacementMap} normalMap={normalMap} roughMap={roughMap}/>
    </mesh>
  )
}

export default StoreFloor
