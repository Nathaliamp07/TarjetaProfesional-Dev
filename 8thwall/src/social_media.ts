import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'Social Link',

  schema: {
    button: ecs.eid,
    url: ecs.string,
  },

  stateMachine: ({world, eid, schemaAttribute}) => {

    const {button, url} = schemaAttribute.get(eid)

    ecs.defineState('default')
      .initial()
      .listen(
        button,
        ecs.input.UI_CLICK,
        () => {
          window.open(url, '_blank')
        }
      )
  },
})