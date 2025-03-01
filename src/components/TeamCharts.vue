<template>
  <div>
    <canvas id="teamChart"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, ref } from 'vue'
import { Chart, registerables } from 'chart.js/auto'
import type { ChartDataset } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import type { TeamDetails } from 'src/services/teams/types'

export default defineComponent({
  name: 'TeamChart',
  props: {
    teamDetails: {
      type: Array as () => TeamDetails[],
      required: true,
    },
  },
  setup(props) {
    const chartInstance = ref<Chart | null>(null)
    const previousTeamDetails = ref<TeamDetails[]>([])

    const hasTeamDetailsChanged = (
      newDetails: TeamDetails[],
      oldDetails: TeamDetails[],
    ): boolean => {
      return JSON.stringify(newDetails) !== JSON.stringify(oldDetails)
    }

    const createChart = () => {
      if (chartInstance.value) {
        chartInstance.value.destroy()
      }

      const canvas = document.getElementById('teamChart') as HTMLCanvasElement
      const ctx = canvas?.getContext('2d')

      if (!ctx || !props.teamDetails || props.teamDetails.length === 0) {
        console.warn('No valid data for chart rendering')
        return
      }

      const chartData = props.teamDetails.map((team: TeamDetails) => ({
        label: team.name,
        snatch: team.snatch,
        snatch_forecast: team.snatch_forecast,
        cj: team.cj,
        cj_forecast: team.cj_forecast,
        total: team.total,
        total_forecast: team.total_forecast,
        snatch_additional_points: team.snatch_additional_points,
        cj_additional_points: team.cj_additional_points,
        total_additional_points: team.total_additional_points,
      }))

      const colors = [
        'rgba(75, 192, 192, 1.0)',
        'rgba(255, 99, 132, 1.0)',
        'rgba(255, 206, 86, 1.0)',
        'rgba(54, 162, 235, 1.0)',
      ]

      const datasets: ChartDataset<'bar', number[]>[] = chartData.flatMap((team, index) => [
        {
          label: team.label,
          data: [
            team.snatch + team.snatch_additional_points,
            team.cj + team.cj_additional_points,
            team.total + team.total_additional_points,
          ],
          backgroundColor:
            team.label.includes('VÖEST') || team.label.includes('steel')
              ? 'rgba(26, 35, 126, 1.0)'
              : colors[index % colors.length] || 'rgba(255, 255, 255, 1.0)', // Ensure it's never undefined
          stack: team.label,
          datalabels: {
            anchor: 'start',
            align: 'end' as 'start' | 'end', // Explicitly cast to valid types
            clamp: true,
          },
        },
        {
          label: `${team.label} Delta`,
          data: [
            team.snatch_forecast - team.snatch,
            team.cj_forecast - team.cj,
            team.total_forecast - team.total,
          ],
          backgroundColor: 'rgba(100, 100, 100, 1.0)',
          stack: team.label,
          datalabels: {
            labels: {
              title: null,
            },
          },
        },
      ])

      chartInstance.value = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['SN', 'C&J', 'ZWK'],
          datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          scales: {
            x: {
              beginAtZero: false,
              stacked: true,
              ticks: { color: 'white' },
              grid: { display: true, color: 'white' },
            },
            y: {
              stacked: true,
              ticks: { color: 'white' },
              grid: { display: false },
            },
          },
          plugins: {
            legend: { display: false },
            datalabels: {
              color: 'white',
              labels: {
                title: { font: { size: 16, weight: 'bold' } },
              },
              formatter: (_value, context) => context.dataset.label,
            },
          },
        },
        plugins: [ChartDataLabels],
      })
    }

    watch(
      () => props.teamDetails,
      (newVal) => {
        if (hasTeamDetailsChanged(newVal, previousTeamDetails.value)) {
          previousTeamDetails.value = JSON.parse(JSON.stringify(newVal))
          createChart()
        }
      },
      { deep: true },
    )

    onMounted(() => {
      Chart.register(...registerables, ChartDataLabels)
      previousTeamDetails.value = JSON.parse(JSON.stringify(props.teamDetails))
      createChart()
    })

    return {}
  },
})
</script>

<style scoped>
div {
  position: relative;
  height: 400px;
}
</style>
