import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"

import { 
    AreaChart, 
    LineChart,
    Line,
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid 
} from 'recharts';

import { useFetchTaskTimeline } from "@/hooks/tasks/useFetchTaskTimeline";

const TaskTimeline = ({taskId}) => {

    const { data: chartData, isLoading, isError, error } = useFetchTaskTimeline(taskId)
    
    const chartConfig = {
      count: {
        label: 'Task Status',
        color: '#8884d8'
      }
    }

    const formatDate = (isoString) => {
      if (!isoString) return 'No date'
      const date = new Date(isoString)
      return date.toLocaleString()
    }

    const getStatusLabel = (value) => {
      if (value === 0) return 'To Do'
      if (value === 1) return 'In Progress'
      if (value === 2) return 'Completed'
      return value
    }

    // Custom formatter for tooltip values
    const tooltipFormatter = (value, name) => {
      return ['Task Status: ', getStatusLabel(value)]
    }

    if (isLoading) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          Loading chart data...
        </div>
      )
    }

    if (isError) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          Error loading chart: {error?.message || 'Unknown error'}
        </div>
      )
    }

    if (!chartData || chartData.length === 0) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          No chart data available
        </div>
      )
    }

    return (
        <ChartContainer config={chartConfig} className="w-full h-full mt-5">
            <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tickFormatter={formatDate} />
                <YAxis 
                    tickFormatter={getStatusLabel} 
                    domain={[0, 2]} 
                    allowDecimals={false}
                    ticks={[0, 1, 2]}
                />
                <ChartTooltip 
                    content={<ChartTooltipContent formatter={tooltipFormatter} />}
                    labelFormatter={formatDate}
                />
                <Area type="monotone" dataKey="count" stroke="black" fill="#262626" />
            </AreaChart>
        </ChartContainer>
    )

}

export default TaskTimeline;