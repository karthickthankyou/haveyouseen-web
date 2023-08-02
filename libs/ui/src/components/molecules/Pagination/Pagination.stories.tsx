import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Pagination } from './Pagination'
import { TablePaginationProps } from '@mui/material'

export default {
  title: 'molecules/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>

const Template: ComponentStory<typeof Pagination> = (
  args: TablePaginationProps,
) => <Pagination {...args} />

export const Primary = Template.bind({})
Primary.args = {
  count: 120,
  page: 3,
  rowsPerPage: 12,
  rowsPerPageOptions: [12, 24, 36, 48],
}
export const CustomRowsPerPage = Template.bind({})
CustomRowsPerPage.args = {
  count: 170,
  page: 3,
  rowsPerPage: 17,
  rowsPerPageOptions: [7, 17, 27, 37],
}

export const ShowFirstLastButton = Template.bind({})
ShowFirstLastButton.args = {
  count: 3600,
  page: 3,
  rowsPerPage: 12,
  rowsPerPageOptions: [12, 24, 36, 48],
  showFirstButton: true,
  showLastButton: true,
}
