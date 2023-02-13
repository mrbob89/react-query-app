import { useMutation, useQueryClient } from 'react-query'
import { StatusSelect } from './StatusSelect'

export default function IssueStatus({ status, issueNumber }) {
  const queryClient = useQueryClient()

  const setStatus = useMutation(
    (status) => {
      return fetch(`/api/issues/${issueNumber}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ status }),
      }).then((res) => res.json())
    },
    {
      onMutate: (status) => {
        const oldStatus = queryClient.getQueryData([
          'issues',
          issueNumber,
        ]).status

        queryClient.setQueryData(['issues', issueNumber], (data) => ({
          ...data,
          status,
        }))

        return function rollback() {
          return queryClient.setQueryData(['issues', issueNumber], (data) => ({
            ...data,
            status: oldStatus,
          }))
        }
      },
      onError: (error, variables, rollback) => {
        rollback()
      },
      onSettled: () => {
        queryClient.invalidateQueries(['issues', issueNumber], { exact: true })
      },
      //  If needed update data with the latest from BE (but its already the same using Optimistic Updates)
      //   onSuccess: (data, variables, rollback) => {
      //     rollback()
      //     queryClient.setQueryData(['issues', issueNumber], data)
      //   },
    }
  )

  return (
    <div className="issue-options">
      <div>
        <span>Status</span>
        <StatusSelect
          noEmptyOption
          value={status}
          onChange={(event) => setStatus.mutate(event.target.value)}
        />
      </div>
    </div>
  )
}
