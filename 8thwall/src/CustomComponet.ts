import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'video-toggle-button',

  schema: {
    button: ecs.eid,
    video: ecs.eid,
    icon: ecs.eid,
  },

  stateMachine: ({world, eid, schemaAttribute}) => {

    const {button, video, icon} = schemaAttribute.get(eid)

    ecs.defineState('default')
      .initial()
      .listen(button, ecs.input.UI_CLICK, () => {

        ecs.VideoControls.mutate(world, video, (controls) => {
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