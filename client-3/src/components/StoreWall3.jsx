import React from 'react'
import * as THREE from "three"

const StoreWall2 = () => {
  return (
    <mesh position={[125,7,0]} rotation-y={Math.PI/2}>
        <planeGeometry args={[150,15]} />
        <meshStandardMaterial
        side={THREE.DoubleSide}
        />
      
    </mesh>
  )
}

export default StoreWall2
