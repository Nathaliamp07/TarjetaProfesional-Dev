import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'video',

  schema: {
    plano: ecs.eid,
    icon: ecs.eid,
  },

  stateMachine: ({world, eid, schemaAttribute}) => {

    const { plano, icon} = schemaAttribute.get(eid)

    ecs.defineState('default')
      .initial()
      .listen(eid, ecs.input.UI_CLICK, () => {

        ecs.VideoControls.mutate(world, plano, (controls) => {
          controls.paused = !controls.paused

          if (controls.paused) {

            ecs.Hidden.remove(world, icon)

          } else {

            ecs.Hidden.set(world, icon)
          }

          return false
        })
      })
  },
})