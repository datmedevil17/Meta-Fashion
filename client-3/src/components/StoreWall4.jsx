import React from 'react'
import * as THREE from "three"

const StoreWall4 = () => {
  return (
    <mesh position={[-125,7,-40]} rotation-y={Math.PI/2}>
        <planeGeometry args={[70,15]} />
        <meshStandardMaterial
        side={THREE.DoubleSide}
        />
      
    </mesh>
  )
}

export default StoreWall4
