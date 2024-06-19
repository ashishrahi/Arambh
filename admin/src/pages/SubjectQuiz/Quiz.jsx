import  { useState } from 'react';
import {
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  Box,
  LinearProgress,
  Grid,
  Paper,
  IconButton,
  Collapse,
  Radio,
  RadioGroup,
  FormControlLabel,
  Breadcrumbs,
  Link,
} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Quiz = () => {
  const categories = [
    {
      id: 1,
      name: 'General Knowledge',
      subcategories: [
        {
          id: 11,
          name: 'World Capitals',
          subjects: [
            {
              id: 111,
              name: 'Capitals Quiz',
              questions: [
                {
                  questionText: 'What is the capital of France?',
                  answerOptions: [
                    { answerText: 'Berlin', isCorrect: false, explanation: 'Berlin is the capital of Germany.' },
                    { answerText: 'Madrid', isCorrect: false, explanation: 'Madrid is the capital of Spain.' },
                    { answerText: 'Paris', isCorrect: true, explanation: 'Correct! Paris is the capital of France.' },
                    { answerText: 'Lisbon', isCorrect: false, explanation: 'Lisbon is the capital of Portugal.' },
                  ],
                },
                {
                  questionText: 'Who is CEO of Tesla?',
                  answerOptions: [
                    { answerText: 'Jeff Bezos', isCorrect: false, explanation: 'Jeff Bezos is the founder of Amazon.' },
                    { answerText: 'Elon Musk', isCorrect: true, explanation: 'Correct! Elon Musk is the CEO of Tesla.' },
                    { answerText: 'Bill Gates', isCorrect: false, explanation: 'Bill Gates is the co-founder of Microsoft.' },
                    { answerText: 'Tony Stark', isCorrect: false, explanation: 'Tony Stark is a fictional character from Marvel Comics.' },
                  ],
                },
              ],
            },
          ],
        },
        // Add more subcategories as needed
      ],
    },
    // Add more categories as needed
  ];

  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [currentSubcategory, setCurrentSubcategory] = useState(null);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleStartQuiz = (subcategory, subject) => {
    setCurrentSubcategory(subcategory);
    setCurrentSubject(subject);
    setCurrentQuestionIndex(0);
    setShowScore(false);
    setScore(0);
    setSelectedAnswer(null);
  };

  const handleAnswerOptionClick = (answerOption) => {
    setSelectedAnswer(answerOption);

    if (answerOption.isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < currentSubject.questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
        setSelectedAnswer(null);
      } else {
        setShowScore(true);
      }
    }, 3000); // Show explanation for 3 seconds before moving to next question
  };

  const handleResetQuiz = () => {
    setCurrentSubcategory(null);
    setCurrentSubject(null);
    setCurrentQuestionIndex(0);
    setShowScore(false);
    setScore(0);
    setSelectedAnswer(null);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4,gap:'10px',justifyContent:'space-between' }}>
   
<Box>
   <Link
          to="/quiz/new"
          style={{ textDecoration: "none", color: "green" }}
        >
          <Button variant="contained" >
            Add New
          </Button>
        </Link> 
        </Box>

      <Paper elevation={4} sx={{ borderRadius: 2 }}>
        <Box p={4}>
          <Card sx={{ boxShadow: 0 }}>
            <CardContent>
              <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                {currentCategory && (
                  <Link color="inherit" onClick={() => setCurrentCategory(null)}>
                    {currentCategory.name}
                  </Link>
                )}
                {currentSubcategory && (
                  <Link color="inherit" onClick={() => setCurrentSubcategory(null)}>
                    {currentSubcategory.name}
                  </Link>
                )}
                {currentSubject && (
                  <Typography color="textPrimary">{currentSubject.name}</Typography>
                )}
              </Breadcrumbs>

              {showScore ? (
                <Box textAlign="center">
                  <Typography variant="h4" component="div" gutterBottom>
                    Quiz Completed
                  </Typography>
                  <Typography variant="h6" component="div" gutterBottom>
                    You scored {score} out of {currentSubject.questions.length}
                  </Typography>
                  <IconButton
                    color="primary"
                    onClick={handleResetQuiz}
                    sx={{ mt: 2 }}
                  >
                    <ReplayIcon fontSize="large" />
                  </IconButton>
                </Box>
              ) : currentSubject ? (
                <>
                  <Box mb={2} textAlign="center">
                    <Typography variant="h5" component="div">
                      Question {currentQuestionIndex + 1}/{currentSubject.questions.length}
                    </Typography>
                    <Typography variant="h6" component="div">
                      {currentSubject.questions[currentQuestionIndex].questionText}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(currentQuestionIndex / currentSubject.questions.length) * 100}
                    sx={{ mb: 3 }}
                  />
                  <RadioGroup>
                    {currentSubject.questions[currentQuestionIndex].answerOptions.map((answerOption, index) => (
                      <FormControlLabel
                        key={index}
                        value={answerOption.answerText}
                        control={
                          <Radio
                            checked={selectedAnswer === answerOption}
                            onChange={() => handleAnswerOptionClick(answerOption)}
                            disabled={selectedAnswer !== null}
                          />
                        }
                        label={answerOption.answerText}
                      />
                    ))}
                  </RadioGroup>
                  {selectedAnswer && (
                    <Collapse in={selectedAnswer !== null}>
                      <Box mt={3} textAlign="center">
                        <Typography
                          variant="body1"
                          component="div"
                          gutterBottom
                        >
                          {selectedAnswer.explanation}
                        </Typography>
                        <IconButton
                          color="secondary"
                          onClick={() =>
                            setSelectedAnswer(null)
                          }
                        >
                          <ExpandMoreIcon />
                        </IconButton>
                      </Box>
                    </Collapse>
                  )}
                </>
              ) : (
                <Grid container spacing={2}>
                  {currentCategory.subcategories.map((subcategory) => (
                    <Grid item xs={12} key={subcategory.id}>
                      <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          {subcategory.name}
                        </Typography>
                        <Grid container spacing={1}>
                          {subcategory.subjects.map((subject) => (
                            <Grid item xs={12} sm={6} key={subject.id}>
                              <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                                onClick={() => handleStartQuiz(subcategory, subject)}
                                sx={{ textTransform: 'none', py: 2 }}
                              >
                                {subject.name}
                              </Button>
                            </Grid>
                          ))}
                        </Grid>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}
            </CardContent>
          </Card>
        </Box>
      </Paper>
    </Container>
  );
};

export default Quiz;
