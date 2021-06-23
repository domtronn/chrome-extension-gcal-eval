import * as React from "react"
import * as ReactDOM from "react-dom"
import { useState, useEffect } from "react"

import { get, set, clear } from "../app/utils/chrome-storage"
import { isEmpty } from "../app/utils/obj"

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import T from "@material-ui/core/Typography"

import Paper from "@material-ui/core/Paper"
import DeleteIcon from "@material-ui/icons/Delete"

import Loader from "./loader"

const Fresh = () => (
  <T variant="body2">
    You don't currently have any settings Please visit
    <a href="https://calendar.google.com/calendar/r">your calendar</a>
    and run the plugin to read your options
  </T>
)

const Settings = ({ summary, config = {} }) => {
  const [cfg, setCfg] = useState(config)

  const valid = (val) =>
    val === "" ||
    /^(1[0-2]|[1-9]|[1-9]:[0-5][0-9]|1[0-2]:[0-5][0-9])[ap]m$/.test(val)

  const startTimeValid = valid(cfg.startTime)
  const endTimeValid = valid(cfg.endTime)

  return (
    <>
      <T variant="h5" gutterBottom>
        Working hours
      </T>
      <form noValidate autoComplete="off">
        <Grid container spacing={3} style={{ marginBottom: 8 }}>
          <Grid item xs={4}>
            <TextField
              error={!startTimeValid}
              onChange={(e) => {
                valid(e.target.value) &&
                  set({ config: { ...cfg, startTime: e.target.value } })
                setCfg({ ...cfg, startTime: e.target.value })
              }}
              value={cfg.startTime || ""}
              helperText={
                !startTimeValid ? "Invalid time - 12hr format e.g. 9:30am" : ""
              }
              label={`Day start time`}
              color="secondary"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              error={!endTimeValid}
              onChange={(e) => {
                valid(e.target.value) &&
                  set({ config: { ...cfg, endTime: e.target.value } })
                setCfg({ ...cfg, endTime: e.target.value })
              }}
              value={cfg.endTime || ""}
              helperText={
                !endTimeValid ? "Invalid time - 12hr format e.g. 6pm" : ""
              }
              label={`Day end time`}
              color="secondary"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </form>
      <T gutterBottom variant="h5">
        Colors in your last GCal
      </T>
      <form noValidate autoComplete="off">
        <Grid container spacing={3}>
          {summary.weekly.summary.map(({ color }, i) => (
            <Grid item xs={4} key={i}>
              <div className="config__item">
                <div
                  className="config__preview"
                  style={{ backgroundColor: color }}
                />
                <TextField
                  value={cfg[color] || ""}
                  onChange={(e) => {
                    set({ config: { ...cfg, [color]: e.target.value } })
                    setCfg({ ...cfg, [color]: e.target.value })
                  }}
                  label={`label for ${color}`}
                  color="secondary"
                  variant="outlined"
                />
              </div>
            </Grid>
          ))}
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "16px",
          }}
        >
          <Button
            size="large"
            startIcon={<DeleteIcon />}
            variant="outlined"
            color="secondary"
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

  if (loading) return <Loader />

  return (
    <Paper
      elevation={4}
      style={{
        maxWidth: "720px",
        margin: "36px auto",
        padding: "36px",
      }}
    >
      <T gutterBottom variant="h3">
        GCal Eval
      </T>
      {isEmpty(summary) ? <Fresh /> : <Settings {...summary} {...config} />}
    </Paper>
  )
}

// --------------

ReactDOM.render(<Options />, document.getElementById("root"))
