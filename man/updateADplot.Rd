% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/renderADplot.R
\name{updateADplot}
\alias{updateADplot}
\title{Change the value of a render ADplot control on the client}
\usage{
updateADplot(
  session,
  inputId,
  label = NULL,
  hidePoints = NULL,
  highlightPoints = NULL
)
}
\arguments{
\item{session}{The \code{session} object passed to function given to
\code{shinyServer}.}

\item{inputId}{The id of the \code{input} object.}

\item{label}{The label to set for the input object.}

\item{hidePoints}{The \code{position} of the points to be hiden.}

\item{highlightPoints}{The \code{position} of the points to be
highlighted.}
}
\description{
Change the value of a render ADplot control on the client
}
\author{
Konstantin A. Blagodatskikh <k.blag@yandex.ru>
}
\keyword{Input}
\keyword{PCR}
\keyword{RDML}
\keyword{Shiny}
