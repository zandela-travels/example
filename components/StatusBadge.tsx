
import clsx from 'clsx'
import React from 'react'

const StatusBadge = ({status}: {status: string}) => {
  return (
    <div className={clsx('status-badge', {
        'bg-green-600': status === 'show',
        'bg-red-600': status === 'hide',
    })}>
      <p className={clsx('text-12-semibold capitalize', {
        'text-dark-200': status === 'show',
        'text-red-500': status === 'hide',
      })}>
        {status === 'show' ? 'Shown' : 'Hidden'}
      </p>
    </div>
  )
}

export default StatusBadge
