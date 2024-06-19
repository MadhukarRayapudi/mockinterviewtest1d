import styled from 'styled-components'

export const MainPageContainer = styled.div`
  background-color: #f1f5f9;
  min-height: 100vh;
  width: 100%;
  padding: 10px;
`

export const Select = styled.select`
  height: 40px;
  width: 40%;
  border-radius: 8px;
  margin: 20px;
  margin-left: 22px;
`

export const Options = styled.option`
  font-family: roboto;
  font-size: 20px;
  color: #000000;
`

export const ProjectsListContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`

export const FailureViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`

export const FailureImage = styled.img`
  height: 400px;
  width: 400px;
`

export const FailureHeading = styled.h1`
  font-family: roboto;
  font-size: 40px;
  color: #475569;
`

export const FailureDescription = styled.p`
  font-family: roboto;
  font-size: 20px;
  color: #475569;
`

export const RetryButton = styled.button`
  background-color: #328af2;
  padding: 8px;
  border-radius: 6px;
  height: 40px;
  width: 140px;
`

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
`
