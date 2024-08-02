import type { ActionDefinition } from '@segment/actions-core'
import type { Settings } from '../generated-types'
import type { Payload } from './generated-types'
import { TopsortAPIClient } from '../client'

const action: ActionDefinition<Settings, Payload> = {
  title: 'Impression',
  defaultSubscription: 'type = "track" and event = "Product Viewed"',
  description: 'A set of impressions means such promotables have become visible to the consumer.',
  fields: {
    id: {
      label: 'Event ID',
      description:
        'Unique ID generated by the client to suppress duplicate events. The length should not exceed 128 characters.',
      type: 'string',
      required: false,
      default: {
        '@path': '$.messageId'
      }
    },
    occurredAt: {
      label: 'Occurred At',
      description: 'Timestamp that the event happened at.',
      type: 'datetime',
      required: true,
      default: {
        '@path': '$.timestamp'
      }
    },
    opaqueUserId: {
      label: 'Opaque User ID',
      description:
        'Identifier for tracking users regardless of sign-in status. The length should not exceed 128 characters.',
      type: 'string',
      required: false,
      default: {
        '@path': '$.anonymousId'
      }
    },
    resolvedBidId: {
      label: 'Resolved Bid ID',
      description:
        'Identifier of an instance of a resolved auction for a determined product. The length should not exceed 128 characters.',
      type: 'string',
      required: false,
      default: {
        '@path': '$.properties.resolvedBidId'
      }
    }
  },
  perform: (request, { payload, settings }) => {
    const client = new TopsortAPIClient(request, settings)
    return client.sendEvent({
      impressions: [payload]
    })
  }
}

export default action
