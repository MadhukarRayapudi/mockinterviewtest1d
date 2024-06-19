import {ListItem, ProjectImage, ProjectName} from './styledComponents'

const ProjectItem = props => {
  const {eachProject} = props
  const {imageUrl, name} = eachProject

  return (
    <ListItem>
      <ProjectImage src={imageUrl} alt={name} />
      <ProjectName> {name} </ProjectName>
    </ListItem>
  )
}

export default ProjectItem
