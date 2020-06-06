import * as React from "react"
import * as ReactDOM from "react-dom"
import { useState, useEffect } from "react"

import { get, set, clear } from "../app/utils/chrome-storage"
import { isEmpty } from "../app/utils/obj"

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"

import Paper from "@material-ui/core/Paper"

import { makeStyles } from "@material-ui/core/styles"
const useStyles = makeStyles((theme) => ({
  button: {
    margin: "0 8px",
  },
}))


const Fresh = () => (
  <p>
    You don't currently have any settings Please visit
    <a href="https://calendar.google.com/calendar/r">your calendar</a>
    and run the plugin to read your options
  </p>
)

const Settings = ({ summary, config = {} }) => {
  const classes = useStyles()
  const [cfg, setCfg] = useState(config)

  console.log(config)
  console.log(cfg)

  return (
    <>
      <p>You have some settings!</p>
      <h2>Colors in your last GCal</h2>
      <form noValidate autoComplete="off">
        <Grid container spacing={3}>
          {summary.weekly.map(([, col]) => (
            <Grid item xs={4}>
              <div className="config__item">
                <div
                  className="config__preview"
                  style={{ backgroundColor: col }}
                />
                <TextField
                  value={cfg[col] || ""}
                  onChange={(e) => {
                    set({ config: { ...cfg, [col]: e.target.value } })
                    setCfg({ ...cfg, [col]: e.target.value })
                  }}
                  label={`label for ${col}`}
                  color="secondary"
                  variant="outlined" />
              </div>
            </Grid>
          ))}
        </Grid>
        <div
          style={{ marginTop: "16px" }}
        >
          <Button
            size="large"
            variant="outlined"
            color="secondary"
            className={classes.button}
            onClick={() => {
              clear("config")
              setCfg({})
            }}
          >
            Clear settings
          </Button>
        </div>

      </form>

    </>
  )
}

const Options = () => {
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState()
  const [config, setConfig] = useState()

  useEffect(() => {
    setLoading(true)
    get("summary", (summary) => {
      setSummary(summary)
      get("config", (config) => {
        setConfig(config)
        setLoading(false)
      })
    })
  }, [])

  if (loading) return <div>loading...</div>

  return (
    <Paper
      elevation={4}
      style={{
        maxWidth: "720px",
        margin: "36px auto",
        padding: "36px"
      }}
    >
      <h1>GCal Eval</h1>
      {isEmpty(summary) ? <Fresh /> : <Settings {...summary} {...config} />}
    </Paper>
  )
}

// --------------

ReactDOM.render(<Options />, document.getElementById("root"))
