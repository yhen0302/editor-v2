import { clone } from '../../share/util/base'
import store, { SceneTreeNode } from '../../store'
import { deleteTreeParentQuote } from '@/core/2d/util/tree'
import { useState } from '@/store/helper'

export function getAvailableSceneTreeNodes() {
  const stateGlobal = useState(store, 'global')

  const sceneTreeNodes: SceneTreeNode[] = clone(stateGlobal.sceneTreeNodes)

  console.log('stateGlobal.sceneTreeNodes', stateGlobal.sceneTreeNodes)

  for (const scene of sceneTreeNodes) {
    for (const page of scene.children) {
      deleteTreeParentQuote(page.trees.twoDimension)
    }
  }

  return sceneTreeNodes
}
