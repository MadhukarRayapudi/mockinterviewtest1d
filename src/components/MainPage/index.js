import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {
  MainPageContainer,
  Select,
  Options,
  ProjectsListContainer,
  FailureViewContainer,
  FailureImage,
  FailureHeading,
  FailureDescription,
  RetryButton,
  LoaderContainer,
} from './styledComponents'

import Header from '../Header'

import ProjectItem from '../ProjectItem'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MainPage extends Component {
  state = {
    projectsList: [],
    activeCategory: categoriesList[0].id,
    apiStatus: apiStatusConstants.initial,
    selectValue: categoriesList[0].displayText,
  }

  componentDidMount() {
    console.log('didmount called')
    this.getProjectsList()
  }

  onClickRetry = () => {
    this.getProjectsList()
  }

  getProjectsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeCategory} = this.state
    // console.log(`https:${activeCategory}`)
    const url = `https://apis.ccbp.in/ps/projects?category=${activeCategory}`
    console.log(url)
    const response = await fetch(url)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      const updatedData = data.projects.map(eachProject => ({
        id: eachProject.id,
        imageUrl: eachProject.image_url,
        name: eachProject.name,
      }))
      // console.log(updatedData)
      this.setState({
        projectsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeCategory = event => {
    this.setState(
      {
        activeCategory: event.target.value,
        selectValue: event.target.value,
      },
      this.getProjectsList,
    )
  }

  renderLoadingView = () => (
    <LoaderContainer>
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
      </div>
    </LoaderContainer>
  )

  renderSuccessView = () => {
    const {projectsList, selectValue} = this.state
    // console.log(activeCategory)
    return (
      <>
        <Header />
        <MainPageContainer>
          <Select
            type="select"
            onChange={this.onChangeCategory}
            value={selectValue}
          >
            {categoriesList.map(eachCategory => (
              <Options key={eachCategory.id} value={eachCategory.id}>
                {eachCategory.displayText}
              </Options>
            ))}
          </Select>
          <ProjectsListContainer>
            {projectsList.map(eachProject => (
              <ProjectItem eachProject={eachProject} key={eachProject.id} />
            ))}
          </ProjectsListContainer>
        </MainPageContainer>
      </>
    )
  }

  renderFailureView = () => (
    <FailureViewContainer>
      <FailureImage
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <FailureHeading> Oops! Something Went Wrong </FailureHeading>
      <FailureDescription>
        We cannot seem to find the page you are looking for
      </FailureDescription>
      <RetryButton type="button" onClick={this.onClickRetry}>
        Retry
      </RetryButton>
    </FailureViewContainer>
  )

  render() {
    const {apiStatus} = this.state
    // console.log(activeCategory)
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default MainPage
