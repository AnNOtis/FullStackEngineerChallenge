import React from 'react'
import { Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

function SingleSkeleton() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={1}></Grid>
      <Grid item xs={3}>
        <Skeleton variant="rect" height={32} />
      </Grid>
      <Grid item xs={5}>
        <Skeleton variant="rect" height={32} />
      </Grid>
      <Grid item xs={2}>
        <Skeleton variant="rect" height={32} />
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  )
}

function TableSkeleton() {
  return (
    <>
      <SingleSkeleton />
      <SingleSkeleton />
      <SingleSkeleton />
    </>
  )
}

export default TableSkeleton
