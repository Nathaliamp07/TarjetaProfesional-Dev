// This is a component file. You can use this file to define a custom component for your project.
// This component will appear as a custom component in the editor.

import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'video-toggle-button',
  schema: {
    plano: ecs.eid,
  },
  stateMachine: ({world, eid, schemaAttribute}) => {
    const { plano } = schemaAttribute.get(eid)

    
    ecs.defineState('initial-state')
      .initial()
      .listen(eid, ecs.input.UI_CLICK, () => {
        const videoEid = schemaAttribute.cursor(eid).plano  

        ecs.VideoControls.mutate(world, videoEid, (cursor) => {
          cursor.paused = !cursor.paused
          return false
        })
      })
  },
})

