import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Paper, Typography, Box, Breadcrumbs } from '@material-ui/core'
import styled from 'styled-components'
import { get } from 'lodash'
import useFetcher from '@/hooks/useFetcher'
import * as apis from '@/apis/admin'
import { adminReviewSessionsPath } from '@/helpers/linkHelpers'
import { formatDate } from '@/utils'
import TableSkeleton from '@/components/TableSkeleton'
import ReviewSessionStatus from '@/components/ReviewSessionStatus'
import ReviewSessionTable from './ReviewSessionTable'

const Wrapper = styled.div`
  margin-top: ${props => props.theme.spacing(4)}px;
`

function ReviewSessionsPage() {
  const { id } = useParams()
  const { result, loading } = useFetcher(apis.getReviewSession, { args: [id] })
  const reviewSession = get(result, 'data.reviewSession', {})
  return (
    <Wrapper>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to={adminReviewSessionsPath()}>Review session list</Link>
        <Typography>Review session #{id}</Typography>
      </Breadcrumbs>
      <Typography variant="h4" gutterBottom>{reviewSession.title}</Typography>
      {result && (
        <Typography component="div" color="textSecondary">
          <ReviewSessionStatus reviewSession={reviewSession} />{' '}
          {formatDate(reviewSession.startAt)} ~ {formatDate(reviewSession.endAt)}
        </Typography>
      )}
      <Paper>
        <Box mt={4}>
          {loading ? (
            <TableSkeleton />
          ) : (
            <ReviewSessionTable reviewSession={reviewSession} />
          )}
        </Box>
      </Paper>
    </Wrapper>
  )
}

ReviewSessionsPage.propTypes = {}

export default ReviewSessionsPage
