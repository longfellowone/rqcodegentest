import { NextPage } from 'next'
import { ProjectDetailsFragment } from '../generated/graphql'

interface Props {
  project: ProjectDetailsFragment
}

const ProjectDetail: NextPage<Props> = ({ project }) => (
  <div>
    {project.id} - {project.project}
  </div>
)

export default ProjectDetail
