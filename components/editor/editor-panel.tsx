"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Crop, Sun, Contrast, Palette, Sparkles, RotateCcw, Save, Download } from "lucide-react"
import { toast } from "sonner"

interface EditorPanelProps {
  onApplyChanges?: (settings: EditorSettings) => void
}

interface EditorSettings {
  brightness: number
  contrast: number
  saturation: number
}

export function EditorPanel({ onApplyChanges }: EditorPanelProps) {
  const [brightness, setBrightness] = useState([100])
  const [contrast, setContrast] = useState([100])
  const [saturation, setSaturation] = useState([100])

  const handleReset = () => {
    setBrightness([100])
    setContrast([100])
    setSaturation([100])
    toast.info("Settings reset to default")
  }

  const handleSave = () => {
    onApplyChanges?.({
      brightness: brightness[0],
      contrast: contrast[0],
      saturation: saturation[0],
    })
    toast.success("Changes saved successfully!")
  }

  const handleAIEnhance = () => {
    // Simulate AI enhancement
    setBrightness([110])
    setContrast([115])
    setSaturation([105])
    toast.success("AI enhancement applied!")
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Palette className="h-5 w-5 text-primary" />
          Adjustments
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tools */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Crop className="mr-2 h-4 w-4" />
            Crop
          </Button>
          <Button variant="outline" size="sm" onClick={handleAIEnhance}>
            <Sparkles className="mr-2 h-4 w-4" />
            AI Enhance
          </Button>
        </div>

        <Separator />

        {/* Brightness */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-sm">
              <Sun className="h-4 w-4 text-amber-500" />
              Brightness
            </Label>
            <span className="text-sm font-medium text-muted-foreground">{brightness[0]}%</span>
          </div>
          <Slider
            value={brightness}
            onValueChange={setBrightness}
            min={0}
            max={200}
            step={1}
            className="w-full"
          />
        </div>

        {/* Contrast */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-sm">
              <Contrast className="h-4 w-4 text-primary" />
              Contrast
            </Label>
            <span className="text-sm font-medium text-muted-foreground">{contrast[0]}%</span>
          </div>
          <Slider
            value={contrast}
            onValueChange={setContrast}
            min={0}
            max={200}
            step={1}
            className="w-full"
          />
        </div>

        {/* Saturation */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-sm">
              <Palette className="h-4 w-4 text-accent" />
              Saturation
            </Label>
            <span className="text-sm font-medium text-muted-foreground">{saturation[0]}%</span>
          </div>
          <Slider
            value={saturation}
            onValueChange={setSaturation}
            min={0}
            max={200}
            step={1}
            className="w-full"
          />
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={handleReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button className="flex-1" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>

        <Button variant="outline" className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardContent>
    </Card>
  )
}
