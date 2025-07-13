#!/bin/bash

echo "🚀 ShopWeekly Tennessee Theme Deployment Script"
echo "=============================================="
echo ""

echo "📋 Available deployment options:"
echo "1. Deploy as new unpublished theme (safe)"
echo "2. Deploy to live store (replaces current theme)"
echo "3. Start development server"
echo "4. Exit"
echo ""

read -p "Choose an option (1-4): " choice

case $choice in
    1)
        echo "🔄 Deploying as new unpublished theme..."
        shopify theme push --store=zkmzgb-a1 --unpublished
        echo "✅ Theme deployed! Go to Shopify admin to publish it."
        ;;
    2)
        echo "⚠️  WARNING: This will replace your current live theme!"
        read -p "Are you sure? (y/N): " confirm
        if [[ $confirm == [yY] ]]; then
            echo "🔄 Deploying to live store..."
            shopify theme push --store=zkmzgb-a1 --live
            echo "✅ Live theme updated!"
        else
            echo "❌ Deployment cancelled."
        fi
        ;;
    3)
        echo "🔄 Starting development server..."
        shopify theme dev --store=zkmzgb-a1
        ;;
    4)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid option. Please choose 1-4."
        ;;
esac
