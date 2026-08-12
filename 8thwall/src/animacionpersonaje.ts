import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'Animacion personajes',

  schema: {
    character: ecs.eid,
  },

  stateMachine: ({world, eid, schemaAttribute}) => {

    let currentAnimation = 0

    const changeAnimation = () => {

      const {character} = schemaAttribute.get(eid)

      if (currentAnimation === 0) {

        ecs.GltfModel.mutate(world, character, (model) => {

          model.animationClip = 'Armature.001|mixamo.com|Layer0'
          model.loop = true

          return false
        })

        currentAnimation = 1

      }

      else {

        ecs.GltfModel.mutate(world, character, (model) => {

          model.animationClip = 'Armature|mixamo.com|Layer0'
          model.loop = true

          return false
        })

        currentAnimation = 0

      }
    }
    ecs.defineState('default')
      .initial()

      .listen(
        schemaAttribute.get(eid).character,
        ecs.input.SCREEN_TOUCH_START,
        () => {
          changeAnimation()
        }
      )
  },
})